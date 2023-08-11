const Account = require('../models/Account.js');

const generateAccountNUmber = async (attempts = 0, maxAttempts = 10) => {
  if (attempts >= maxAttempts) {
    throw new Error(
      'Exceeded maximum attempts to generate a unique account number'
    );
  }
  const length = 10;

  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let accountNumber = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    accountNumber += characters.charAt(randomIndex);
  }

  try {
    console.log('Generated Account Number:', accountNumber);
    // check if the generated account number exist in the database
    const existingAccount = await Account.findOne({ accountNumber });
    if (existingAccount) {
      console.log('Account NUmber already exists, generate a new one.');
      return generateAccountNUmber(attempts + 1, maxAttempts);
    }
    return accountNumber;
  } catch (error) {
    console.error('Error checking for existing account numbers:', error)
    throw new Error('Error checking for existing account numbers');
  }
};


module.exports = generateAccountNUmber;
