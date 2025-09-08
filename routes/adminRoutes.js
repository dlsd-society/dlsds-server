const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middlewares/authMiddleware');

router.post('/register', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);

// Protected route (example)
router.get('/dashboard', authenticateAdmin, (req, res) => {
  res.json({ message: 'Welcome to the protected Admin Dashboard', adminId: req.adminId });
});

module.exports = router;
