const Store = require('./store');
const TechModel = require('../models/technology');

class TechStore extends Store {
  constructor() {
    super();
    this.model = new TechModel();
  }
}

module.exports = TechStore;
