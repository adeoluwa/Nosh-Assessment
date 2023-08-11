const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/User.js');


// Register Users
module.exports = {
  signup: async (req, res) => {
    try {
      const { firstName, lastName, role, email, password } = req.body;

      const salt = await bcrypt.genSalt();

      const hashedpassword = await bcrypt.hash(password, salt);

      const accountNumber = Math.random().toString(36).substring(7)

      const newUser = new User({
        firstName,
        lastName,
        role,
        email,
        password: hashedpassword,
        accountNumber,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Invalid credentials. ' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

// Login Users
