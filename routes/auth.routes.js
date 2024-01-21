 const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../controllers/auth.controller');
const middleware = require('../middlewares');

const router = express.Router();

 router.post('/register', async (req, res) => {
  try {
    const { username, password,email } = req.body;
    const existingUser = await User.findOne({ username });
    // exist email

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
        }
 
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password ,email});

    await newUser.save();
    const token = generateToken(newUser);
    const auth = { token, userId: newUser._id, username: newUser.username,email:newUser.email };
    res.status(201).json({ auth });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

 router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

 router.get('/protected',(req, res) => {
  res.json({ message: 'You are authenticated!', userId: req.userId });
});

module.exports = router;
