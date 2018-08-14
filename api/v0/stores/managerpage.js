const Store = require('./store');
const ManagerpageModel = require('../models/managerpage');

class MNGStore extends Store {
  constructor() {
    super();
    this.model = new ManagerpageModel();
  }
}

module.exports = MNGStore;
