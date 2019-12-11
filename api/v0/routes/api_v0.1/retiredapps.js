const express = require('express');
const appCtrl = require('../../controllers/application');

const router = express.Router();

router.route('/')
    .get(appCtrl.findAllRetired);

module.exports = router; 