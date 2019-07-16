const FISMAexpStore = require('../stores/fismaexp');
const AppStore = require('../stores/application');
const POCStore = require('../stores/poc');

const fismaexpStore = new FISMAexpStore();
const appStore = new AppStore();
const pocStore = new POCStore();

function findAll(req, res) {
  fismaexpStore.search(`call get_expired_fisma(0)`, (results) => {
    res.json(results);
  });
}

function findThisYear(req, res) {
  fismaexpStore.search(`call get_expired_fisma(1)`, (results) => {
    res.json(results);
  });
}

function findNextYear(req, res) {
  fismaexpStore.search(`call get_expired_fisma(2)`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
  findThisYear,
  findNextYear
};
