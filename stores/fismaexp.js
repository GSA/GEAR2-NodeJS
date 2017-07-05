const Store = require('./store');
const FISMAexpModel = require('../models/fismaexp');

class FISMAexpStore extends Store {
  constructor() {
    super();
    this.model = new FISMAexpModel();
  }
}

module.exports = FISMAexpStore;
