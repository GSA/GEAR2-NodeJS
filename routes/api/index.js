const express = require('express');
const cap = require('./capability');
const app = require('./application');
const org = require('./organization');
const sys = require('./parentsystem');
const appTIME = require('./apptime');
const its = require('./itstandards');
const fisma = require('./fisma');
const fismapoc = require('./fisma_poc');
const inv = require('./investments');

const router = express.Router();

router.use('/applications', app);
router.use('/capability', cap);
router.use('/organizations', org);
router.use('/parentsystems', sys);
router.use('/apptime', appTIME);
router.use('/itstandards', its);
router.use('/fisma', fisma);
router.use('/fismapoc', fismapoc);
router.use('/investments', inv);

module.exports = router;
