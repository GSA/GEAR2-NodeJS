const OrgStore = require('../stores/organization');
const AppStore = require('../stores/application');
const InterfaceStore = require('../stores/interface');

const orgStore = new OrgStore();
const appStore = new AppStore();
const interfaceStore = new InterfaceStore();

function findAll(req, res) {
  orgStore.query('SELECT * FROM SAODS.udfGetOrgList()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  orgStore.query(`SELECT * FROM SAODS.udfGetOrgList() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

function findApplications(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 'o')`, (results) => {
    res.json(results);
  });
}

function findInterfaces(req, res) {
  interfaceStore.query(`SELECT * FROM SAODS.udfGetAppInterfaces()
    WHERE OwnerID1 = ${req.params.id} or OwnerID2 = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findInterfaces,
  findAll,
  findOne,
};
