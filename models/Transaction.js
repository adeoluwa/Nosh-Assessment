const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  fromAccountId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  toAccountId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
