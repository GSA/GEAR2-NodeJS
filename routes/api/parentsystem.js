const express = require('express');
const orgCtrl = require('../../controllers/parentsystem');

const router = express.Router();

router.route('/')
    .get(orgCtrl.findAll);

router.route('/:id')
    .get(orgCtrl.findOne);

module.exports = router;
