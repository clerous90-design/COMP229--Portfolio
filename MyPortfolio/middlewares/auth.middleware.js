const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key_here'; // Keep this consistent with your controller

verifyJWT = (req, res, next) => {
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
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyJWT;