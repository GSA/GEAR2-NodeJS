const AppStore = require('../stores/application');
const CapStore = require('../stores/capability');
const TechStore = require('../stores/technology');
const POCStore = require('../stores/poc');

const appStore = new AppStore();
const capStore = new CapStore();
const techStore = new TechStore();
const pocStore = new POCStore();

function findAll(req, res) {
  appStore.query('SELECT * FROM SAODS.udfAppFullSuite2(default)', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfAppFullSuite2(${req.params.id})`, (results) => {
    res.json(results);
  });
}

function findCapabilities(req, res) {
  capStore.query(`SELECT * FROM SAODS.udfGetCapByApp(${req.params.id})`, (results) => {
    res.json(results);
  });
}

function findTechnologies(req, res) {
  techStore.query(`SELECT * FROM SAODS.udfGetTechByApp(${req.params.id})`, (results) => {
    res.json(results);
  });
}

function findPOCs(req, res) {
  pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('a') WHERE ObjID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findCapabilities,
  findTechnologies,
  findPOCs,
  findAll,
  findOne,
};
