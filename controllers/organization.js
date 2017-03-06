const OrgStore = require('../stores/organization');
//const CapStore = require('../stores/capability');
//const TechStore = require('../stores/technology');
//const POCStore = require('../stores/poc');

const orgStore = new OrgStore();


function findAll(req, res) {
  orgStore.query('SELECT * FROM SAODS.udfGetOrgList()', (results) => {
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
