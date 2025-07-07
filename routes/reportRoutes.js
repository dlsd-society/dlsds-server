// server/routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const authenticateAdmin = require("../middlewares/authMiddleware");
const reportController = require("../controllers/reportController");

router.post("/upload", authenticateAdmin, upload.single("file"), reportController.uploadReport);
router.get("/:category", reportController.getReportsByCategory);

module.exports = router;