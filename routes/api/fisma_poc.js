const express = require('express');
const fismapocCtrl = require('../../controllers/fisma_poc');

const router = express.Router();

console.log('Fisma POC routes loaded');

router.route('/')
    .get(fismapocCtrl.findAll);

router.route('/:id')
    .get(fismapocCtrl.findOne);

// router.route('/:id/capabilities/')
    // .get(testCtrl.findCapabilities);

// router.route('/:id/technologies/')
    // .get(testCtrl.findTechnologies);

 router.route('/:id/pocs/')
     .get(fismapocCtrl.findPOCs);

module.exports = router;
