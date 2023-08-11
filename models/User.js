const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 10,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 10,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  accountNumber: {
    type: String,
    required: true,
    index: true,
  },
  balance: {
    type: Number,
    default: 2000,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
