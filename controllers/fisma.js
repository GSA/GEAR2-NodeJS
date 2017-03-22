const FISMAStore = require('../stores/fisma');
const POCStore = require('../stores/poc');

const fismaStore = new FISMAStore();
const pocStore = new POCStore();

function findAll(req, res) {
  fismaStore.query('SELECT * FROM SAODS.udfGetFISMAList()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  fismaStore.query(`SELECT * FROM SAODS.udfGetFISMAList() WHERE FISMAID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

// children
function findPOCs(req, res) {
  pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('f') WHERE ObjID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findPOCs,
  findAll,
  findOne,
};
