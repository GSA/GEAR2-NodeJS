const Store = require('./store-mysql');
const InterfaceModel = require('../models/interface');

class InterfaceStore extends Store {
  constructor() {
    super();
    this.model = new InterfaceModel();
  }
}

module.exports = InterfaceStore;
