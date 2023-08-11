const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/User.js');

const Account = require('../models/Account.js');

// Create Accounts
module.exports = {
  createAccount: async (req, res) => {
    try {
      const { token, user } = req.body;

      const decodedToken = jwt.decode(token)

      if (decodedToken && decodedToken.id == user._id){
        const userId = user._id
        const accountNumber = Math.random().toString(36).substring(7)
        const newAccount = new Account({
          accountNumber,
          user: userId
        })
        const savedAccount = await newAccount.save()
        return res.status(201).json(savedAccount)
      }else{
        return res.status(403).json({error: "Invalid token"})
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
