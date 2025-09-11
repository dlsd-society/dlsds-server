const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const INTERNSHIP_VERSION = "INTERNSHIP2025";

async function generateUniqueId() {
  const prefix = INTERNSHIP_VERSION;
  const count = await prisma.internship.count();
  const nextNum = count + 1;
  return prefix + String(nextNum).padStart(4, "0");
}

exports.registerInternship = async (req, res) => {
  try {
    const {
      joinPreference,
      fullName,
      email,
      phone,
      cityState,
      institution,
      projectPreference,
      groupDetails,
      domains,
      tools,
      previousProjects,
      certificateOption,
      agreement,
    } = req.body;

    const registrationId = await generateUniqueId();

    const registration = await prisma.internship.create({
      data: {
        id: registrationId,
        joinPreference,
        fullName,
        email,
        phone,
        cityState,
        institution,
        projectPreference,
        groupDetails,
        domains,
        tools,
        previousProjects,
        certificateOption,
        agreement,
        internshipVersion: INTERNSHIP_VERSION,
      },
    });

    res.status(201).json(registration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving internship registration" });
  }
};
