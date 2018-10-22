const Store = require('./store-mysql');
const CapModel = require('../models/capability');

class CapStore extends Store {
  constructor() {
    super();
    this.model = new CapModel();
  }
}

module.exports = CapStore;
