// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// router.post('/', userController.createUser);
// router.get('/', userController.getAllUsers);

// module.exports = router;

const express = require('express');
const { signup, login, getProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected route for logged-in users
router.get('/profile', authenticateUser, getProfile);

module.exports = router;
