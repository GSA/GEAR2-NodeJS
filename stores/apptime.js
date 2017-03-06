const Store = require('./store');
const AppTIMEModel = require('../models/apptime');

class AppTIMEStore extends Store {
  constructor() {
    super();
    this.model = new AppTIMEModel();
  }
}

module.exports = AppTIMEStore;
