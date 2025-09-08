const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// User Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // res.status(201).json({ message: "User registered successfully", user });
    // Remove password field before sending response
    const { password: _, ...safeUser } = user;

    res.status(201).json({ 
      message: "User registered successfully", 
      user: safeUser 
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // exclude password before sending
    const { password: _, ...safeUser } = user;

    res.json({
      message: "Login successful",
      token,
      user: safeUser, // send user details back
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Protected Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional: Keep your old functions if you still need them)
exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
