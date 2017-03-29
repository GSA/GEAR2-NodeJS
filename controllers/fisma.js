const FISMAStore = require('../stores/fisma');
const POCStore = require('../stores/poc');
const AppStore = require('../stores/application');

const fismaStore = new FISMAStore();
const pocStore = new POCStore();
const appStore = new AppStore();

function findAll(req, res) {
  fismaStore.query('SELECT * FROM SAODS.udfGetFISMAList()', (results) => {
    res.json(results);
  });
}

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
function findPOCs(req, res) {
  console.log('FIND POCS');
  const filter = req.params.id ? `WHERE ObjID = ${req.params.id}` : '';

  pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('f') ${filter}`, (results) => {
    res.json(results);
  });
}

function findApplications(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 'f')`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findPOCs,
  findAll,
  findOne,
};
