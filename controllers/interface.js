const InterfaceStore = require('../stores/interface');

const interfaceStore = new InterfaceStore();

function findAll(req, res) {
  interfaceStore.query('SELECT * FROM SAODS.udfGetAppInterfaces()', (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  interfaceStore.query(`SELECT * FROM SAODS.udfGetAppInterfaces() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
  findOne,
};
