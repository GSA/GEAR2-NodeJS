/* jshint node:true */

var express = require('express');
var orgCtrl = require('../../controllers/apptime');

var router = express.Router();

router.route('/')
    .get(orgCtrl.findAll);

router.route('/:id')
    .get(orgCtrl.findOne);

module.exports = router;
