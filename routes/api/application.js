/* jshint node:true */

var express = require('express');
var appCtrl = require('../../controllers/application');

console.log('application routes loaded');

var router = express.Router();

router.route('/')
    .post(appCtrl.create)
    .get(appCtrl.findAll);

router.route('/:id')
    .get(appCtrl.findOne)
    .put(appCtrl.update)
    .delete(appCtrl.remove);

module.exports = router;
