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
  investmentStore.search(`CALL get_investment_detail(0);`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  investmentStore.search(`CALL get_investment_detail(${req.params.id});`, (results) => {
    res.json(results);
  });
}

// children
function findApplications(req, res) {
  appStore.search(`call get_application_detail( ${req.params.id}, 'i')`, (results) => {
    res.json(results);
  });
}

function findPOCs(req, res) {
  pocStore.search(`CALL get_investment_detail(${req.params.id});`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findPOCs,
  findAll,
  findOne,
};
