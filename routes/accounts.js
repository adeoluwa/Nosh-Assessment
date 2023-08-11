
const express = require('express');

const router = express.Router();

const accountController = require('../controllers/accounts.js');

router.post('/create', accountController.createAccount);

module.exports = router;

