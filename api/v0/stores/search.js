const Store = require('./store-mysql');
const SearchModel = require('../models/search');

class SearchStore extends Store {
    constructor () {
        super();
        this.model = new SearchModel();
    }
}

module.exports = SearchStore; 