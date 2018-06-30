const Store = require('./store-mysql');
const AppTIMEModel = require('../models/apptime');

class AppTIMEStore extends Store {
  constructor() {
    super();
    this.model = new AppTIMEModel();
  }
}

module.exports = AppTIMEStore;
