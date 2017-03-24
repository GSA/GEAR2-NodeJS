const Store = require('./store');
const InterfaceModel = require('../models/interface');

class InterfaceStore extends Store {
  constructor() {
    super();
    this.model = new InterfaceModel();
  }
}

module.exports = InterfaceStore;
