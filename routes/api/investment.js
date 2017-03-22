const express = require('express');
const investmentCtrl = require('../../controllers/investment');

const router = express.Router();

router.route('/')
    .get(investmentCtrl.findAll);

router.route('/:id')
    .get(investmentCtrl.findOne);

// children
router.route('/:id/applications/')
    .get(investmentCtrl.findApplications);

module.exports = router;
