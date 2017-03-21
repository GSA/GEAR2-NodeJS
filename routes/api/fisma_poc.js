const express = require('express');
const fismapocCtrl = require('../../controllers/fisma_poc');

const router = express.Router();

router.route('/')
    .get(fismapocCtrl.findAll);

router.route('/:id')
    .get(fismapocCtrl.findOne);

// children
router.route('/:id/pocs/')
     .get(fismapocCtrl.findPOCs);

module.exports = router;
