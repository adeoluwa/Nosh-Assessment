const express = require('express');

const router = express.Router();

const authRoutes = require('./auth');

const accountRoutes = require('./accounts');

const transferRoutes = require('./transfer');


router.use('/auth', authRoutes);

router.use('/accounts', accountRoutes);

router.use('/transfer', transferRoutes);

module.exports = router;
