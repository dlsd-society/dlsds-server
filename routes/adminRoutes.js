const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');

router.post('/register', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);

// Admin dashboard (Protected route)
router.get('/dashboard', authenticateAdmin, (req, res) => {
  res.json({ message: 'Welcome to the protected Admin Dashboard', adminId: req.adminId });
});

// Admin action pages (Protected route)
router.get('/hackathons', authenticateAdmin, adminController.getHackathons);
router.get("/hackathon/:hackathonId/participants", authenticateAdmin, adminController.getHackathonParticipants);
router.post('/issue-badge', authenticateAdmin, adminController.issueBadge);

router.get('/internships', authenticateAdmin, adminController.getInternships);
router.post('/issue-certificate', authenticateAdmin, adminController.issueCertificate);

router.get("/verify/:code", adminController.verifyCredential);

module.exports = router;