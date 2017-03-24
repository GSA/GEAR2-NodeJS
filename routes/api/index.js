const express = require('express');
const app = require('./application');
const appTIME = require('./apptime');
const cap = require('./capability');
const fisma = require('./fisma');
const poc = require('./poc');
const its = require('./itstandards');
const interfaces = require('./interface');
const investment = require('./investment');
const org = require('./organization');
const sys = require('./parentsystem');

const router = express.Router();

router.use('/applications', app);
router.use('/apptime', appTIME);
router.use('/capabilities', cap);
router.use('/fisma', fisma);
router.use('/itstandards', its);
router.use('/interfaces', interfaces);
router.use('/investments', investment);
router.use('/organizations', org);
router.use('/parentsystems', sys);
router.use('/pocs', poc);

module.exports = router;
