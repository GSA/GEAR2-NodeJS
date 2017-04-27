const POCStore = require('../stores/poc');

const pocStore = new POCStore();

function findAll(req, res) {
  pocStore.query("SELECT ALL * FROM SAODS.udfGetPOCDetails('r')", (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('r') WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {

  findAll,
  findOne,
};
