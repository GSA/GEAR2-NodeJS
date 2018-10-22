const express = require('express');
const mngCtrl = require('../../controllers/managerpage');

const router = express.Router();

router.route('/')
    .get(mngCtrl.findAll);

router.route('/:id')
    .get(mngCtrl.findOne);

// // children
// router.route('/:id/applications/')
    // .get(itsCtrl.findApplications);


module.exports = router;
