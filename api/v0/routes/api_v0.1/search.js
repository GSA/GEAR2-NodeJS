const express = require('express');
const searchCtrl = require('../../controllers/search');

const router = express.Router();

router.route('/:kw')
    .get(searchCtrl.searchAll);

module.exports = router; 