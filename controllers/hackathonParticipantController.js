const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Helper: generate unique registration ID
async function generateUniqueId(hackathonId, prefix) {
  const count = await prisma.hackathonParticipant.count({
    where: { hackathonId },
  });
  const nextNum = count + 1;
  return `${prefix}-${String(nextNum).padStart(4, "0")}`;
}

// Register participant
exports.registerParticipant = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const {
      teamName,
      teamSize,
      soloPreference,
      fullName,
      email,
      phone,
      cityState,
      experience,
      agreement,
    } = req.body;

    // Ensure hackathon exists
    const hackathon = await prisma.hackathon.findUnique({
      where: { id: Number(hackathonId) },
    });
    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    // Generate ID based on hackathon name+version
    const prefix = hackathon.name.toUpperCase() + hackathon.version.replace(".", "");
    const registrationId = await generateUniqueId(hackathon.id, prefix);

    // Save participant
    const participant = await prisma.hackathonParticipant.create({
      data: {
        id: registrationId,
        teamName,
        teamSize,
        soloPreference,
        fullName,
        email,
        phone,
        cityState,
        experience,
        agreement,
        hackathonId: hackathon.id,
      },
    });

    res.status(201).json({
      message: "Registration successful",
      participant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving registration" });
  }
};
