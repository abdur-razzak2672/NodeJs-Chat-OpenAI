// middlewares/validatorMiddleware.js

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
  