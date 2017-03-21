const express = require('express');
const fismaCtrl = require('../../controllers/fisma');

const router = express.Router();

router.route('/')
    .get(fismaCtrl.findAll);

router.route('/:id')
    .get(fismaCtrl.findOne);

module.exports = router;
