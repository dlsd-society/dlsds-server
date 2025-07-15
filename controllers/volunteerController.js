const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.submitVolunteer = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      email,
      qualification,
      city,
      state,
      agreed,
    } = req.body;

    if (!fullName || !contactNumber || !email || !qualification || !city || !state) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        fullName,
        contactNumber,
        email,
        qualification,
        city,
        state,
        agreed: Boolean(agreed),
      },
    });

    res.status(201).json({ 
      message: "Volunteer submitted", 
      success: true,
      volunteer 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};