const jwt = require('jsonwebtoken');
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const verifyJWT = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  // Handle 'Bearer <token>' format
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized! Invalid or expired token.' });
    }
    req.userId = decoded.id || decoded._id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('role');
    if (!user || user.role !== 'Admin') {
      return res.status(403).json({ message: 'Require Admin Role!' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Error verifying user role.' });
  }
};

module.exports = { verifyJWT, isAdmin };