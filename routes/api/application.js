/* jshint node:true */

var express = require('express');
var appCtrl = require('../../controllers/application');

console.log('application routes loaded');

var router = express.Router();

router.route('/')
    .get(appCtrl.findAll);

router.route('/:id')
    .get(appCtrl.findOne);

router.route('/:id/capabilities/')
    .get(appCtrl.findCapabilities);

router.route('/:id/technologies/')
    .get(appCtrl.findTechnologies);

module.exports = router;
