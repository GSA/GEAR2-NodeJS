var inherits = require('inherits');
var Store = require('./store');
var CapabilityModel = require('../models/capability');

function CapStore() {
    Store.call(this);
    console.log('CapStore')
};

inherits(CapStore, Store);

module.exports = CapStore;
