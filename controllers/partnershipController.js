const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.submitPartnership = async (req, res) => {
  try {
    const { organisation, contactPerson, email, contactNumber, remarks } = req.body;

    if (!organisation || !contactPerson || !email || !contactNumber) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const partnership = await prisma.partnership.create({
      data: {
        organisation,
        contactPerson,
        email,
        contactNumber,
        remarks,
      },
    });

    res.status(201).json({ 
      message: "Partnership submitted", 
      success: true,
      partnership 
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};