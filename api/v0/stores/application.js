const Store = require('./store-mysql');
const ApplicationModel = require('../models/application');

class AppStore extends Store {
  constructor() {
    super();
    this.model = new ApplicationModel();
  }
}

module.exports = AppStore;
