const express = require('express');
const capabilityCtrl = require('../../controllers/capability');

const router = express.Router();

router.route('/')
    .get(capabilityCtrl.findAll);

router.route('/:id')
    .get(capabilityCtrl.findOne);

module.exports = router;
