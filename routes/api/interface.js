const express = require('express');
const interfaceCtrl = require('../../controllers/interface');

const router = express.Router();

router.route('/')
    .get(interfaceCtrl.findAll);

router.route('/:id')
    .get(interfaceCtrl.findOne);

module.exports = router;
