const SearchStore = require('../stores/search');

const searchStore = new SearchStore();

function searchAll(req, res) {
    const query = `SELECT * FROM cowboy_ods.v_global_search where Keyname LIKE '%${req.params.kw}%' or Description like '%${req.params.kw}%'`;
    console.log('haha', query);
    searchStore.query(query, (results) => {
        res.json(results);
    })
}

module.exports = {
    searchAll
}; 