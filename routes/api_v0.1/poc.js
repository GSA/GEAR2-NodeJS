const express = require('express');
const pocCtrl = require('../../controllers/poc');

const router = express.Router();

console.log('POC routes loaded');

router.route('/')
    .get(pocCtrl.findAll);

router.route('/:id')
    .get(pocCtrl.findOne);

// router.route('/:id/capabilities/')
    // .get(testCtrl.findCapabilities);

// router.route('/:id/technologies/')
    // .get(testCtrl.findTechnologies);

 //router.route('/:id/pocs/')
 //     .get(fismapocCtrl.findPOCs);

module.exports = router;
