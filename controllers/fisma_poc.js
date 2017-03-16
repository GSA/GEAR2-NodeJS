const FismapocStore = require('../stores/fisma_poc');
// const CapStore = require('../stores/capability');
// const TechStore = require('../stores/technology');
 const POCStore = require('../stores/poc');

const fismapocStore = new FismapocStore();
// const capStore = new CapStore();
// const techStore = new TechStore();
 const pocStore = new POCStore();

function findAll(req, res) {
  fismapocStore.query("SELECT ID, Name, RelOrgDisplayName, FIPS199, ISSO, ISSM, AO, PM  FROM SAODS.udfGetFISMAList()", (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
    fismapocStore.query(`SELECT ID, Name, RelOrgDisplayName, FIPS199, ISSO, ISSM, AO, PM  FROM SAODS.udfGetFISMAList() WHERE ID = ${req.params.id}`, (results) => {
      res.json(results);
   });
}

// function findCapabilities(req, res) {
  // capStore.query(`SELECT * FROM SAODS.udfGetCapByApp(${req.params.id})`, (results) => {
    // res.json(results);
  // });
// }

// function findTechnologies(req, res) {
  // techStore.query(`SELECT * FROM SAODS.udfGetTechByApp(${req.params.id})`, (results) => {
    // res.json(results);
  // });
// }

 function findPOCs(req, res) {
   pocStore.query(`SELECT * FROM SAODS.udfGetPOCDetails('f') WHERE ObjID = ${req.params.id}`, (results) => {
     res.json(results);
   });
 }

module.exports = {
  // findCapabilities,
  // findTechnologies,
  findPOCs,
  findAll,
  findOne,
};
