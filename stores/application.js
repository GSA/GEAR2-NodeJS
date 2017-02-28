var inherits = require('inherits');
var Store = require('./store');
var ApplicationModel = require('../models/application');
var _ = require('underscore')

function AppStore() {
//    Store.call(this);
    this.model = new ApplicationModel();
};
_.extend(AppStore.prototype, Store.prototype)
//inherits(AppStore, Store);

module.exports = AppStore;
