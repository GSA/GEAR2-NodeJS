const FISMAStore = require('../stores/fisma');
const AppStore = require('../stores/application');
const POCStore = require('../stores/poc');

const fismaStore = new FISMAStore();
const appStore = new AppStore();
const pocStore = new POCStore();

function findAll(req, res) {
  fismaStore.query('SELECT * FROM SAODS.udfGetFISMAList()', (results) => {
    res.json(results);
  });
}

// TODO: make sure we're using next() properly
function findOne(req, res, next) {
  if (req.params.id === 'pocs') {
    next();
  } else {
    fismaStore.query(`SELECT * FROM SAODS.udfGetFISMAList() WHERE ID = ${req.params.id}`, (results) => {
      res.json(results);
    });
  }
}

// children
function findApplications(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 'f')`, (results) => {
    res.json(results);
  });
}
function findPOCs(req, res) {
  const filter = req.params.id ? `WHERE ID = ${req.params.id}` : '';

  pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('f') ${filter}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findPOCs,
  findAll,
  findOne,
};
