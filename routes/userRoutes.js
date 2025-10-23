const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { signup, login, getProfile, updateProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { getMyAchievements } = require('../controllers/userController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected route for logged-in users
router.get('/profile', authenticateUser, getProfile);
// router.put('/profile', authenticateUser, updateProfile);

// Update profile (with optional image upload)
router.put('/profile', authenticateUser, upload.single('profilePic'), updateProfile);

router.get('/achievements', authenticateUser, getMyAchievements);

// OAuth Routes
// Google
router.get("/auth/google", 
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Issue JWT
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    // // Redirect or send response
    // res.json({ token, user: req.user });
    // Redirect to frontend with token + user
    // res.redirect(
    //   `${process.env.CLIENT_URL}/user/google-success?token=${token}&user=${encodeURIComponent(
    //     JSON.stringify(req.user)
    //   )}`
    // );
    res.redirect(
      `${process.env.CLIENT_URL}/user/google-success?token=${token}`
    );
  }
);

// Similar for GitHub, Twitter, Facebook...

module.exports = router;
