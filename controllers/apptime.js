const AppTIMEStore = require('../stores/apptime');
//const CapStore = require('../stores/capability');
//const TechStore = require('../stores/technology');
//const POCStore = require('../stores/poc');

const appTIMEStore = new AppTIMEStore();


function findAll(req, res) {
  appTIMEStore.query('SELECT ALL * FROM SAODS.udfGetAppTIME()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppTIME() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}


module.exports = {

  findAll,
  findOne,
};
""