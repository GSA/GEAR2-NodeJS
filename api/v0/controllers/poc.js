const POCStore = require('../stores/poc');

const pocStore = new POCStore();

function findAll(req, res) {
  pocStore.search("call get_poc('RISSO')", (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  pocStore.search(`call get_poc(${req.params.id})`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
  findOne,
};
