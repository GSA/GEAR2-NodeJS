/* jshint node:true */

var express = require('express');
var timeCtrl = require('../../controllers/apptime');

console.log('appTIME routes loaded');

var router = express.Router();

router.route('/')
    .get(timeCtrl.findAll);

router.route('/:id')
    .get(timeCtrl.findOne);

module.exports = router;
