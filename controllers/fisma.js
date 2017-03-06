const FISMAStore = require('../stores/fisma');
//const CapStore = require('../stores/capability');
//const TechStore = require('../stores/technology');
//const POCStore = require('../stores/poc');

const fismaStore = new FISMAStore();


function findAll(req, res) {
  fismaStore.query('SELECT * FROM SAODS.udfGetFISMAList()', (results) => {
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
