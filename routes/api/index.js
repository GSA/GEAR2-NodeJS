const express = require('express');
const app = require('./application');
const cap = require('./capability');
const org = require('./organization');
const sys = require('./parentsystem');
const appTIME = require('./apptime');
const its = require('./itstandards');
const investment = require('./investment');
const fisma = require('./fisma');
const fismapoc = require('./fisma_poc');

const router = express.Router();

router.use('/applications', app);
router.use('/capabilities', cap);
router.use('/organizations', org);
router.use('/parentsystems', sys);
router.use('/apptime', appTIME);
router.use('/itstandards', its);
router.use('/investments', investment);
router.use('/fisma', fisma);
router.use('/fismapoc', fismapoc);

module.exports = router;
