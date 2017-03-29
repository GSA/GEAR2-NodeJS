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

module.exports = router;
