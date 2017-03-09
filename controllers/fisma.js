const FISMAStore = require('../stores/fisma');

const fismaStore = new FISMAStore();

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


module.exports = {

  findAll,
  findOne,
};
