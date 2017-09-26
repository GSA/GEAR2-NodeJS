const AppStore = require('../stores/application');
const CapStore = require('../stores/capability');
const TechStore = require('../stores/technology');
const POCStore = require('../stores/poc');
const InterfaceStore = require('../stores/interface');

const appStore = new AppStore();
const capStore = new CapStore();
const techStore = new TechStore();
const pocStore = new POCStore();
const interfaceStore = new InterfaceStore();

function findAll(req, res) {
  let fields = '*';
  let filter = '';

  if (Object.hasOwnProperty.call(req.query, 'fields')) {
    fields = req.query.fields;
  }
  if (Object.hasOwnProperty.call(req.query, 'ownerName')) {
    filter = `'%${req.query.ownerName}%'`;
  }
  else filter = 0;
  appStore.search(`call get_application_full_suite( ${filter})`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  appStore.search(`call get_application_full_suite(${req.params.id})`, (results) => {
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
  pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('a') WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

function findInterfaces(req, res) {
  interfaceStore.query(`SELECT * FROM SAODS.udfGetAppInterfaces()
    WHERE AppID1 = ${req.params.id} or AppID2 = ${req.params.id} ORDER BY Owner1`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findCapabilities,
  findTechnologies,
  findPOCs,
  findInterfaces,
  findAll,
  findOne,
};
