const CapabilityStore = require('../stores/capability');
const AppStore = require('../stores/application');

const capabilityStore = new CapabilityStore();
const appStore = new AppStore();

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

// children
function findApplications(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 'c')`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findAll,
  findOne,
};
