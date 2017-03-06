const Store = require('./store');
const ITStandardsModel = require('../models/itstandards');

class ITSStore extends Store {
  constructor() {
    super();
    this.model = new ITStandardsModel();
  }
}

module.exports = ITSStore;
