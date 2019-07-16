const ITSStore = require('../stores/itstandards');
const AppStore = require('../stores/application');

const itsStore = new ITSStore();
const appStore = new AppStore();

function findAll(req, res) {
  itsStore.search(`CALL get_technology_detail(0);`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  itsStore.search(`CALL get_technology_detail(${req.params.id})`, (results) => {
    res.json(results);
  });
}

function findApplications(req, res) {
  appStore.search(`call get_application_detail( ${req.params.id}, 't')`, (results) => {
    res.json(results);
  });
}


module.exports = {
  findApplications,
  findAll,
  findOne,
};
