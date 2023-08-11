const express = require('express');

const router = express.Router();

const authenticate = require('../middleware/authenticate.js');

const initiateTransferController = require('../controllers/createTransfer.js');

//Transfer

router.post(
  '/transfer',
  authenticate.verifyToken,
  initiateTransferController.transfer
);

module.exports = router;
