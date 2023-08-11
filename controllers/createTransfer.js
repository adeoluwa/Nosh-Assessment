const User = require('../models/User.js');

const Transaction = require('../models/Transaction.js');

module.exports = {
  transfer: async (req, res) => {
    try {
      const { toAccount, amount } = req.body;

      let account1 = await User.findOne({
        accountNumber: req.user.accountNumber,
      });

      if (!account1) {
        return res.status(404).json({ message: 'User account not found ' });
      }

      let account2 = await User.findOne({
        accountNumber: toAccount,
      });

      if (!account2) {
        return res
          .status(400)
          .json({ message: ' Invalid Designation Account ' });
      }

      if (account1.balance < amount) {
        return res
          .status(400)
          .json({ message: 'Insufficient fund to initiate transfer' });
      }

      account1.balance -= amount;
      account2.balance += amount;

      // Save updated accounts
      await account1.save();
      await acccount2.save();

      // Create transaction record
      const newTransaction = new Transaction({
        fromAccountId: account1._id,
        toAccountId: account2._id,
        amount: amount,
      });

      await newTransaction.save();

      res.status(200).json({ message: 'Transaction Successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
