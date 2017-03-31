const InvestmentStore = require('../stores/investment');
const AppStore = require('../stores/application');
const POCStore = require('../stores/poc');

const investmentStore = new InvestmentStore();
const appStore = new AppStore();
const pocStore = new POCStore();

function findAll(req, res) {
  let fields = '*';

  if (Object.hasOwnProperty.call(req.query, 'fields')) {
    fields = req.query.fields;
  }
  investmentStore.query(`SELECT ${fields} FROM SAODS.udfGetInvList()`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  investmentStore.query(`SELECT * FROM SAODS.udfGetInvList() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

// children
function findApplications(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 'i')`, (results) => {
    res.json(results);
  });
}

function findPOCs(req, res) {
  pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('i') WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findPOCs,
  findAll,
  findOne,
};
