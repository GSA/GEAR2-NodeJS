const Store = require('./store-mysql');
const POCModel = require('../models/poc');

class POCStore extends Store {
  constructor() {
    super();
    this.model = new POCModel();
  }
}

module.exports = POCStore;
