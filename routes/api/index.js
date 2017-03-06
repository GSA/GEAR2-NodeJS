const express = require('express');
const app = require('./application');

const router = express.Router();

router.use('/applications', app);

module.exports = router;
