const SysStore = require('../stores/parentsystem');

const sysStore = new SysStore();

function findAll(req, res) {
  sysStore.query('SELECT * FROM SAODS.udfGetSystemList()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  sysStore.query(`SELECT * FROM SAODS.udfGetSystemList() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
  findOne,
};
