const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accountNumber:{
        type:String,
        required:true,
        index:true,
    },
    balance: {
        type:Number,
        default:2000
    }
})

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
