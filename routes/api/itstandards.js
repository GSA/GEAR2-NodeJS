/* jshint node:true */

var express = require('express');
var itsCtrl = require('../../controllers/itstandards');

console.log('itstandards routes loaded');

var router = express.Router();

router.route('/')
    
    .get(itsCtrl.findAll);
 
router.route('/:id')
    .get(itsCtrl.findOne);

module.exports = router;
