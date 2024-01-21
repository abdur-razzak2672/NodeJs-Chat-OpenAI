 const {verifyToken} = require('../controllers/auth.controller');
exports.validateCreateStudent = (req, res, next) => {
    const { name, email, phone } = req.body;
  
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, phone are required fields.' });
    }
  
    next();
  };
  
  exports.validateUpdateStudent = (req, res, next) => {
    const { name, email, phone } = req.body;
  
    if (!name && !email && !phone) {
      return res.status(400).json({ error: 'At least one field (name, email, phone) is required for an update.' });
    }
  
    next();
  };


 
exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }

  try {
    const decodedToken = verifyToken(token);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
};
