const FISMAexpStore = require('../stores/fismaexp');
const AppStore = require('../stores/application');
const POCStore = require('../stores/poc');

const fismaexpStore = new FISMAexpStore();
const appStore = new AppStore();
const pocStore = new POCStore();

function findAll(req, res) {
  fismaexpStore.search(`call get_expired_fisma_archer(0)`, (results) => {
    res.json(results);
  });
}

function findThisYear(req, res) {
  fismaexpStore.search(`call get_expired_fisma_archer(1)`, (results) => {
	  console.log('Look here!!! ',results);
 	let newResults = results[0].POC.filter(res => res.Email !== undefined);
	results[0].POC = newResults;
    res.json(results);
  });
}

function findNextYear(req, res) {
  fismaexpStore.search(`call get_expired_fisma_archer(2)`, (results) => {
	let newResults = results[0].POC.filter(res => res.Email !== undefined);
	results[0].POC = newResults;
    res.json(results);
  });
}

module.exports = {
  findAll,
  findThisYear,
  findNextYear
};
