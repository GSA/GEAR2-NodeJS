const Store = require('./store');
const fismapocModel = require('../models/fisma_poc');

class FismapocStore extends Store {
  constructor() {
    super();
    this.model = new fismapocModel();
  }
}

module.exports = FismapocStore;
