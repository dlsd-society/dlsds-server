const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createBookSession = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      state,
      city,
      organization,
      topics
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !state ||
      !city ||
      !organization      
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const selectedTopics = Object.keys(topics).filter(
      (key) => topics[key] === true
    );

    if (selectedTopics.length === 0) {
      return res.status(400).json({ message: "At least one topic required" });
    }

    const session = await prisma.bookSession.create({
      data: {
        fullName,
        email,
        phone,
        state,
        city,
        organization,
        topics: selectedTopics,
        agreement: false,
      },
    });

    res.status(201).json({
      message: "Session booked successfully",
      data: session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
