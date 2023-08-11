const express = require('express');

const router = express.Router();

const authRoutes = require('./auth');

const accountRoutes = require('./accounts');

const transferRoutes = require('./initTransfer');


router.use('/auth', authRoutes);

router.use('/accounts', accountRoutes);

router.use('/init', transferRoutes);

module.exports = router;
