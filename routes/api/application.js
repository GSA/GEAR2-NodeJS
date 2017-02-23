/* jshint node:true */

var express = require('express');
var appCtrl = require('../../controllers/application');

console.log('application routes loaded');

var router = express.Router();

router.route('/')
    .get(appCtrl.findAll);

router.route('/:id')
    .get(appCtrl.findOne);

module.exports = router;
