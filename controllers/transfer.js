const User = require('../models/User.js');

const Transaction = require('../models/Transaction.js');

module.exports = {
  transfer: async (req, res) => {
    try {
      const { toAccount, amount } = req.body;

      const sourceAccount = await User.findOne({
        accountNumber: req.user.accountNumber,
      });

      if (!sourceAccount) {
        return res.status(404).json({ message: 'User account not found ' });
      }

      const destinationAccount = await User.findOne({
        accountNumber: toAccount,
      });

      if (!destinationAccount) {
        return res
          .status(400)
          .json({ message: ' Invalid Designation Account ' });
      }

      if (sourceAccount.balance < amount) {
        return res
          .status(400)
          .json({ message: 'Insufficient fund to initiate transfer' });
      }

      sourceAccount.balance -= amount;
      destinationAccount.balance += amount;

      // Save updated accounts
      await sourceAccount.save();
      await destinationAccount.save();

      // Create transaction record
      const newTransaction = new Transaction({
        fromAccountId: sourceAccount._id,
        toAccountId: destinationAccount._id,
        amount: amount,
      });

      await newTransaction.save();

      res.status(200).json({ message: 'Transaction Successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
