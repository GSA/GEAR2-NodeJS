const express = require('express');
const orgCtrl = require('../../controllers/organization');

const router = express.Router();

router.route('/')
    .get(orgCtrl.findAll);

router.route('/:id')
    .get(orgCtrl.findOne);

// children
router.route('/:id/applications/')
    .get(orgCtrl.findApplications);

router.route('/:id/interfaces/')
    .get(orgCtrl.findInterfaces);

module.exports = router;
