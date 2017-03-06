const ITSStore = require('../stores/itstandards');
//const CapStore = require('../stores/capability');
//const TechStore = require('../stores/technology');
//const POCStore = require('../stores/poc');

const itsStore = new ITSStore();


function findAll(req, res) {
  itsStore.query('SELECT * FROM SAODS.udfGetITSList()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  //appStore.query(`SELECT * FROM SAODS.udfAppFullSuite2(${req.params.id})`, (results) => {
   // res.json(results);
  //});
}


module.exports = {

  findAll,
  findOne,
};
