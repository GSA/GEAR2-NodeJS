const SysStore = require('../stores/parentsystem');
//const CapStore = require('../stores/capability');
//const TechStore = require('../stores/technology');
//const POCStore = require('../stores/poc');

const sysStore = new SysStore();


function findAll(req, res) {
  sysStore.query('SELECT ALL * FROM SAODS.udfGetSystemList()', (results) => {
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
