const FismapocStore = require('../stores/fisma_poc');
// const CapStore = require('../stores/capability');
// const TechStore = require('../stores/technology');
 const POCStore = require('../stores/poc');

const fismapocStore = new FismapocStore();
// const capStore = new CapStore();
// const techStore = new TechStore();
 const pocStore = new POCStore();

function findAll(req, res) {
  fismapocStore.query("SELECT ALL * FROM SAODS.udfGetPOCDetails('f')", (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
   // testStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id})`, (results) => {
     // res.json(results);
 //  });
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
