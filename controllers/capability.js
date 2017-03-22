const CapabilityStore = require('../stores/capability');

const capabilityStore = new CapabilityStore();

function findAll(req, res) {
  let fields = '*';

  if (Object.hasOwnProperty.call(req.query, 'fields')) {
    fields = req.query.fields;
  }
  capabilityStore.query(`SELECT ${fields} FROM SAODS.udfGetBusCapList()`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  capabilityStore.query(`SELECT * FROM SAODS.udfGetBusCapList() WHERE ID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
  findOne,
};
