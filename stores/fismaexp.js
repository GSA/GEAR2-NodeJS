const Store = require('./store-mysql');
const FISMAexpModel = require('../models/fisma');

class FISMAexpStore extends Store {
  constructor() {
    super();
    this.model = new FISMAexpModel();
  }
}

module.exports = FISMAexpStore;
