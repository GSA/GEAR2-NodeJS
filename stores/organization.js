const Store = require('./store');
const OrganizationModel = require('../models/organization');

class OrgStore extends Store {
  constructor() {
    super();
    this.model = new OrganizationModel();
  }
}

module.exports = OrgStore;
