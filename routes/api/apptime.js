/* jshint node:true */

var express = require('express');
var orgCtrl = require('../../controllers/apptime');

console.log('appTIME routes loaded');

var router = express.Router();

router.route('/')
    
    .get(orgCtrl.findAll);
 
router.route('/:id')
    .get(orgCtrl.findOne);

module.exports = router;
