/* jshint node:true */

var express = require('express');
var fismaCtrl = require('../../controllers/fisma');

console.log('FISMA routes loaded');

var router = express.Router();

router.route('/')
    
    .get(fismaCtrl.findAll);
 
router.route('/:id')
    .get(fismaCtrl.findOne);

module.exports = router;
