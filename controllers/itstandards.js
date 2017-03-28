const ITSStore = require('../stores/itstandards');
const AppStore = require('../stores/application');

const itsStore = new ITSStore();
const appStore = new AppStore();

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

function findApplications(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 't')`, (results) => {
    res.json(results);
  });
}


module.exports = {
  findApplications,
  findAll,
  findOne,
};
