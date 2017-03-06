const Store = require('./store');
const ApplicationModel = require('../models/application');

class AppStore extends Store {
  constructor() {
    super();
    this.model = new ApplicationModel();
  }
}

module.exports = AppStore;
