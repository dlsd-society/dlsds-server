const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { authenticateAdmin } = require("../middlewares/authMiddleware");
const reportController = require("../controllers/reportController");

router.get("/", reportController.getAllReports); // fetch all reports
router.get("/:category", reportController.getReportsByCategory);
router.post("/upload", authenticateAdmin, upload.single("file"), reportController.uploadReport);

module.exports = router;