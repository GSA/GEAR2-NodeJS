const AppTIMEStore = require('../stores/apptime');

const appTIMEStore = new AppTIMEStore();

function findAll(req, res) {
  appTIMEStore.query('SELECT ALL * FROM SAODS.udfGetAppTIME()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  appTIMEStore.query(`SELECT * FROM SAODS.udfGetAppTIME() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {

  findAll,
  findOne,
};
