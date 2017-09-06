const express = require('express');
const fisma = require('./fisma');

const router = express.Router();

router.use('/fisma', fisma);

module.exports = router;
