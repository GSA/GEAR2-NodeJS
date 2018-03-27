const express = require('express');
const interfacev2Ctrl = require('../../controllers/interfacev2');

const router = express.Router();

router.route('/')
    .get(interfacev2Ctrl.findAll);
router.route('/:id')
    .get(interfacev2Ctrl.findOne);
module.exports = router;
