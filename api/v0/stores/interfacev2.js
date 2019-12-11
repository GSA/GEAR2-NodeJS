const Store = require('./store-mysql');
const Interfacev2Model = require('../models/interfacev2');

class Interfacev2Store extends Store {
  constructor() {
    super();
    this.model = new Interfacev2Model();
  }
}

module.exports = Interfacev2Store;
