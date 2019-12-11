const Store = require('./store-mysql');
const FISMAModel = require('../models/fisma');

class FISMAStore extends Store {
  constructor() {
    super();
    this.model = new FISMAModel();
  }
}

module.exports = FISMAStore;
