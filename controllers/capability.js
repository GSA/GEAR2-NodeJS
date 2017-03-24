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

// TODO: make sure we're using next() properly
function findOne(req, res, next) {
  if (req.params.id === 'app-counts') {
    next();
  } else {
    capabilityStore.query(`SELECT * FROM SAODS.udfGetBusCapList() WHERE ID = ${req.params.id}`, (results) => {
      res.json(results);
    });
  }
}

// children
function findApplications(req, res) {
  appStore.query(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 'c')`, (results) => {
    res.json(results);
  });
}

// special (reports, data viz, etc.)
function findAppCounts(req, res) {
  capabilityStore.query('SELECT * FROM SAODS.udfGetCapModel()', (results) => {
    res.json(results);
  });
}


module.exports = {
  findApplications,
  findAppCounts,
  findAll,
  findOne,
};
