const Store = require('./store-mysql');
const ApplicationRetiredModel = require('../models/appretired');

class AppRetiredStore extends Store {
    constructor() {
        super();
        this.model = new ApplicationRetiredModel();
    }
}

module.exports = AppRetiredStore;