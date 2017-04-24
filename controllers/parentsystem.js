const SysStore = require('../stores/parentsystem');
const AppStore = require('../stores/application');

const sysStore = new SysStore();
const appStore = new AppStore();

function findAll(req, res) {
  sysStore.query('SELECT * FROM SAODS.udfGetSystemList()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  sysStore.query(`SELECT * FROM SAODS.udfGetSystemList() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

// children
function findApplications(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 's')`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findAll,
  findOne,
};
