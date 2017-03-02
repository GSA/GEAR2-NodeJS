const AppStore = require('../stores/application');
// const CapModel = require('../models/capability');
// const TechModel = require('../models/technology');
// const POCModel = require('../models/poc');

const appStore = new AppStore();
// const capModel = new CapModel();
// const capStore = new Store();
// const techModel = new TechModel();
// const techStore = new Store();
// const pocModel = new POCModel();
// const pocStore = new Store();

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

// function findCapabilities(req, res) {
//   capStore.model = capModel;
//   capStore.query(`SELECT * FROM SAODS.udfGetCapByApp(${req.params.id})`, (results) => {
//     res.json(results);
//   });
// }
//
// function findTechnologies(req, res) {
//   techStore.model = techModel;
//   techStore.query(`SELECT * FROM SAODS.udfGetTechByApp(${req.params.id})`, (results) => {
//     res.json(results);
//   });
// }
//
// function findPOCs(req, res) {
//   pocStore.model = pocModel;
//   pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('a') WHERE ObjID = ${req.params.id}`, (results) => {
//     res.json(results);
//   });
// }

module.exports = {
  // findCapabilities,
  // findTechnologies,
  // findPOCs,
  findAll,
  findOne,
};
