const { PrismaClient } = require("@prisma/client"); 
const prisma = new PrismaClient();

// Create a Hackathon
exports.createHackathon = async (req, res) => {
  try {
    const { name, version } = req.body;

    const hackathon = await prisma.hackathon.create({
      data: { name, version },
    });

    res.status(201).json(hackathon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Hackathons
exports.getHackathons = async (req, res) => {
  try {
    const hackathons = await prisma.hackathon.findMany();
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single Hackathon with participants
exports.getHackathonById = async (req, res) => {
  try {
    const { id } = req.params;

    const hackathon = await prisma.hackathon.findUnique({
      where: { id: Number(id) },
      include: { participants: true },
    });

    if (!hackathon) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    res.json(hackathon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 