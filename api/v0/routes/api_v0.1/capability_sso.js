const express = require('express');
const capabilitySSOCtrl = require('../../controllers/capability_sso');

const router = express.Router();

router.route('/')
    .get(capabilitySSOCtrl.findAll);

router.route('/:name')
    .get(capabilitySSOCtrl.findSSO);

module.exports = router;
