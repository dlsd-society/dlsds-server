const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const HACKATHON_VERSION = "FIRSTHACK2025";

async function generateUniqueId() {
  const prefix = HACKATHON_VERSION;
  const count = await prisma.firstHack.count();
  const nextNum = count + 1;
  return prefix + String(nextNum).padStart(4, "0");
}

exports.register = async (req, res) => {
  try {
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

    const registrationId = await generateUniqueId();

    const registration = await prisma.firstHack.create({
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
        hackathonVersion: HACKATHON_VERSION,
      },
    });

    res.status(201).json(registration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving registration" });
  }
};