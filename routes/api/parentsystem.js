const express = require('express');
const sysCtrl = require('../../controllers/parentsystem');

const router = express.Router();

router.route('/')
    .get(sysCtrl.findAll);

router.route('/:id')
    .get(sysCtrl.findOne);
	
// children
router.route('/:id/applications/')
    .get(sysCtrl.findApplications);
	

module.exports = router;
