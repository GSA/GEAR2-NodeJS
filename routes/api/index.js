/* jshint node:true */

var express = require('express');
var app = require('./application');

var router = express.Router();

router.use('/app', app);

module.exports = router;
