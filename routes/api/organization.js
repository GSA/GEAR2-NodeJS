/* jshint node:true */

var express = require('express');
var orgCtrl = require('../../controllers/organization');

console.log('organization routes loaded');

var router = express.Router();

router.route('/')    
    .get(orgCtrl.findAll);

router.route('/:id')
    .get(orgCtrl.findOne);

module.exports = router;
