const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const { customAlphabet } = require('nanoid'); // for unique codes

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);

// Register Admin
exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 🚫 Block if an admin already exists
    const adminCount = await prisma.admin.count();
    if (adminCount > 0) {
      return res.status(403).json({
        error: 'Admin signup is disabled',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'Admin created successfully',
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Internships
exports.getInternships = async (req, res) => {
  try {
    const internships = await prisma.internship.findMany();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Hackathons
exports.getHackathons = async (req, res) => {
  try {
    const hackathons = await prisma.hackathon.findMany();
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get hackathon participants
exports.getHackathonParticipants = async (req, res) => {
  const { hackathonId } = req.params;
  try {
    const participants = await prisma.hackathonParticipant.findMany({
      where: { hackathonId: parseInt(hackathonId) },
      include: { 
        hackathon: true,
        credentials: true, 
      }, // so you also see hackathon name/version
    });
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: "Error fetching participants" });
  }
};

// Issue Certificates (Internships only)
exports.issueCertificate = async (req, res) => {
  const { userId, internshipId, fileUrl } = req.body;

  if (!userId || !internshipId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const code = `ZDS-${nanoid()}`;

    const certificate = await prisma.credential.create({
      data: {
        type: "CERTIFICATE",
        code,
        fileUrl,
        userId,
        internshipId,
      },
    });

    res.status(201).json({ message: 'Certificate issued', certificate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Issue Badges (Hackathons only)
exports.issueBadge = async (req, res) => {
  const { participantIds, hackathonId, category, fileUrl } = req.body;

  if (!participantIds || participantIds.length === 0) {
    return res.status(400).json({ error: "No participants selected" });
  }

  try {
    const createdBadges = [];

    for (const pid of participantIds) {
      // Ensure participant exists
      const participant = await prisma.hackathonParticipant.findUnique({
        where: { id: pid },
      });
      if (!participant) continue;

      // Try to link to user if they registered with same email
      const user = await prisma.user.findUnique({
        where: { email: participant.email },
      });

      // Generate unique code for verification
      const code = `ZDS-${nanoid()}`;

      const badge = await prisma.credential.create({
        data: {
          type: "BADGE",
          category, // "WINNER" | "RUNNER_UP" | "PARTICIPANT"
          code,
          fileUrl,
          participantId: pid,
          userId: user ? user.id : undefined, // optional link
        },
      });

      createdBadges.push(badge);
    }

    res.status(201).json({
      message: `${createdBadges.length} badge(s) issued successfully`,
      badges: createdBadges,
    });
  } catch (err) {
    console.error("Error issuing badges:", err);
    res.status(500).json({ error: "Error issuing badges" });
  }
};

// Verify credentials publicly
exports.verifyCredential = async (req, res) => {
  const { code } = req.params;
  try {
    console.log("Looking for code:", code);
    const credential = await prisma.credential.findUnique({
      where: { code },
      include: {
        participant: { include: { hackathon: true } },
        internship: true,
        user: true,
      },
    });

    if (!credential) {
      return res.status(404).json({ error: "Credential not found" });
    }

    res.json({
      type: credential.type,
      category: credential.category,
      issuedAt: credential.issuedAt,
      fileUrl: credential.fileUrl,
      user: credential.user?.name || credential.participant?.fullName,
      email: credential.user?.email || credential.participant?.email,
      hackathon: credential.participant?.hackathon || null,
      internship: credential.internship || null,
    });
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
};

// Paginated Internships (Admin only)
exports.getInternshipsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const [total, internships] = await Promise.all([
      prisma.internship.count(),
      prisma.internship.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: internships,
      pagination: {
        total,
        page,
        totalPages,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};