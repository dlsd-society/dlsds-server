const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// User Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Remove password field before sending response
    const { password: _, ...safeUser } = user;

    res.status(201).json({ 
      message: "User registered successfully", 
      user: safeUser 
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // exclude password before sending
    const { password: _, ...safeUser } = user;

    res.json({
      message: "Login successful",
      token,
      user: safeUser, // send user details back
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Protected Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // exclude password before sending
    const { password: _, ...safeUser } = user;

    res.json({
      message: "Profile fetched successfully",
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, role, linkedIn, website, about } = req.body;
    let profilePic;

    if (req.file && req.file.path) {
      profilePic = req.file.path; // Cloudinary URL
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name,
        email,
        linkedIn,
        website,
        about,
        ...(profilePic && { profilePic }), // only update if image uploaded
      },
    });

    const { password: _, ...safeUser } = updatedUser;

    res.json({
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

exports.getMyAchievements = async (req, res) => {
  try {
    const userId = req.user.id;

    const achievements = await prisma.credential.findMany({
      where: { userId },
      include: {
        participant: {
          include: { hackathon: true },
        },
        internship: true,
      },
      orderBy: { issuedAt: 'desc' },
    });

    res.json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
};

