const Store = require('./store-mysql');
const ParentSystemModel = require('../models/parentsystem');

class SysStore extends Store {
  constructor() {
    super();
    this.model = new ParentSystemModel();
  }
}

module.exports = SysStore;
