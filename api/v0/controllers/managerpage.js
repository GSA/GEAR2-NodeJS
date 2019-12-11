const MNGStore = require('../stores/managerpage');
const AppStore = require('../stores/application');

const mngStore = new MNGStore();
// const appStore = new AppStore();

function findAll(req, res) {
  mngStore.query('SELECT * FROM SAODS.udfmgrCountAppThings()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  // mngStore.query(`SELECT * FROM SAODS.udfGetITSList() WHERE ID = ${req.params.id}`, (results) => {
    // res.json(results);
  // });
}

// function findApplications(req, res) {
  // mngStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 't')`, (results) => {
    // res.json(results);
  // });
// }


module.exports = {
  // findApplications,
  findAll,
  findOne,
};
