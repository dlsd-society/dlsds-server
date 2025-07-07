// server/controllers/reportController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.uploadReport = async (req, res) => {
  try {
    const { title, session, startDate, endDate, category } = req.body;
    const fileUrl = req.file.path;

    const report = await prisma.report.create({
      data: {
        title,
        session,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        category,
        fileUrl,
      },
    });

    res.status(201).json({ message: "Report uploaded", report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReportsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const reports = await prisma.report.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
