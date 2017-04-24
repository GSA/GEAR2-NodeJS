
//const FismapocStore = require('../stores/fisma_poc');
// const CapStore = require('../stores/capability');
// const TechStore = require('../stores/technology');
 const POCStore = require('../stores/poc');

const pocStore = new pocStore();
// const capStore = new CapStore();
// const techStore = new TechStore();
//const pocStore = new POCStore();

function findAll(req, res) {
  pocStore.query("SELECT ID, Name, RelOrgDisplayName, FIPS199, ISSO, ISSM, AO, PM  FROM SAODS.udfGetFISMAList()", (results) => {

    res.json(results);
  });
}

function findOne(req, res) {

    pocStore.query(`SELECT ID, Name, RelOrgDisplayName, FIPS199, ISSO, ISSM, AO, PM  FROM SAODS.udfGetFISMAList() WHERE ID = ${req.params.id}`, (results) => {
      res.json(results);
   });
}


module.exports = {

  findAll,
  findOne,
};
