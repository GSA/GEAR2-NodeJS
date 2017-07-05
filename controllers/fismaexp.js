const FISMAexpStore = require('../stores/fismaexp');
const AppStore = require('../stores/application');
const POCStore = require('../stores/poc');

const fismaexpStore = new FISMAexpStore();
const appStore = new AppStore();
const pocStore = new POCStore();

function findAll(req, res) {
  fismaexpStore.query('SELECT * FROM SAODS.udfGetFISMAexpiredList(0)', (results) => {
    res.json(results);
  });
}

function findThisYear(req, res) {
  fismaexpStore.query('SELECT * FROM SAODS.udfGetFISMAexpiredList(1)', (results) => {
    res.json(results);
  });
}

function findNextYear(req, res) {
  fismaexpStore.query('SELECT * FROM SAODS.udfGetFISMAexpiredList(2)', (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
  findThisYear,
  findNextYear
};
