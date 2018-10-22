const AppTIMEStore = require('../stores/apptime');

const appTIMEStore = new AppTIMEStore();

function findAll(req, res) {
  appTIMEStore.search(`call get_application_full_suite(0)`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  appTIMEStore.search(`call get_application_full_suite( ${req.params.id})`, (results) => {
    res.json(results);
  });
}

module.exports = {

  findAll,
  findOne,
};
