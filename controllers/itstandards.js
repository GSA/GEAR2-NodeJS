const ITSStore = require('../stores/itstandards');

const itsStore = new ITSStore();

function findAll(req, res) {
  itsStore.query('SELECT * FROM SAODS.udfGetITSList()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  itsStore.query(`SELECT * FROM SAODS.udfGetITSList() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
  findOne,
};
