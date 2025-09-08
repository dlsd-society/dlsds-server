const express = require('express');
const { signup, login, getProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected route for logged-in users
router.get('/profile', authenticateUser, getProfile);

module.exports = router;
