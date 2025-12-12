const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const INTERNSHIP_VERSION = "OTHERINTERNSHIP2025";

async function generateUniqueId() {
  const prefix = INTERNSHIP_VERSION;
  const count = await prisma.otherInternship.count();
  const next = count + 1;
  return prefix + String(next).padStart(4, "0");
}

exports.registerOtherInternship = async (req, res) => {
  try {
    const {
        fullName,
        email,
        phone,
        cityState,
        institution,
        areaOfInternship,
        otherAreaText,
        certificateOption,
        agreement
    } = req.body;

    const id = await generateUniqueId();

    const data = await prisma.otherInternship.create({
      data: {
        id,
        fullName,
        email,
        phone,
        cityState,
        institution,
        areaOfInternship,
        otherAreaText,
        certificateOption,
        agreement,
        internshipVersion: INTERNSHIP_VERSION,
      }
    });

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving internship data" });
  }
};
