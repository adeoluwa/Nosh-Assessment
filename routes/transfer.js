const express = require('express')

const router = express.Router()

const authenticate = require('../middleware/authenticate.js')

const Account = require('../models/Account.js')

const User = require('../models/')


//Transfer
router.post('/transfer', authenticate.verifyToken, async(req, res) => {
    try {
        const userId = req.user.userId

        const {fromAccount, toAccount, amount } = req.body;

        // Find sender and receiver accounts
        const senderAccount = await Account.findOne({accountNumber:fromAccount, userId})
        const receiverAccount = await Account.findOne({accountNumber:toAccount})

        if (!senderAccount || !receiverAccount) {
            return res.status(404).json({message:' Account not found '})
        }

        // Check if sender has sufficient balance
        if(senderAccount.balance < amount){
            return res.status(400).json({message:'Insufficient balance'})
        }

        // Perform the transfer if sender has sufficient balance
        senderAccount.balance -= amount
        receiverAccount.balance += amount

        await senderAccount.save()
        await receiverAccount.save()

        return res.status(200).json({message: 'Transfer successful'})
    
    } catch (error) {
        return res.status(500).json({message:'Internal Server error'})
    }
})

module.exports = router;