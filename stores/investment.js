const Store = require('./store-mysql');
const InvestmentModel = require('../models/investment');

class InvestmentStore extends Store {
  constructor() {
    super();
    this.model = new InvestmentModel();
  }
}

module.exports = InvestmentStore;
