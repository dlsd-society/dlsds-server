const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Middleware for User authentication
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;     // keep whole payload (id + email)
    req.userId = decoded.id; // shorthand
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authenticateAdmin, authenticateUser };
