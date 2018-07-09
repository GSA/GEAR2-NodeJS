const express = require('express');
const fismaexpCtrl = require('../../controllers/fismaexp');

const router = express.Router();

router.route('/')
    .get(fismaexpCtrl.findAll);

router.route('/thisyear')
    .get(fismaexpCtrl.findThisYear);

router.route('/nextyear')
    .get(fismaexpCtrl.findNextYear);

module.exports = router;
