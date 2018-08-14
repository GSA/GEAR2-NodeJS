const SysStore = require('../stores/parentsystem');
const AppStore = require('../stores/application');

const sysStore = new SysStore();
const appStore = new AppStore();

function findAll(req, res) {
  sysStore.search(`call get_parent_system_detail(0)`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  sysStore.search(`call get_parent_system_detail (${req.params.id})`, (results) => {
    res.json(results);
  });
}

// children
function findApplications(req, res) {
  appStore.search(`call get_application_detail( ${req.params.id}, 'p')`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findAll,
  findOne,
};
