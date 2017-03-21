const express = require('express');
const itsCtrl = require('../../controllers/itstandards');

const router = express.Router();

router.route('/')
    .get(itsCtrl.findAll);

router.route('/:id')
    .get(itsCtrl.findOne);

// children
router.route('/:id/applications/')
    .get(itsCtrl.findApplications);


module.exports = router;
