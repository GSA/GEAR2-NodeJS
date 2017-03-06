const express = require('express');
const app = require('./application');
const org = require('./organization');
const sys = require('./parentsystem');
const appTIME = require('./apptime');
const its = require('./itstandards');
const fisma = require('./fisma');

const router = express.Router();

router.use('/applications', app);
router.use('/organization', org);
router.use('/parentsystem', sys);
router.use('/apptime', appTIME);
router.use('/itstandards', its);
router.use('/fisma', fisma);

module.exports = router;
