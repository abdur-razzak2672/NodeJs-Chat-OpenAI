 const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, 'your-secret-key');
};

module.exports = { generateToken, verifyToken };
