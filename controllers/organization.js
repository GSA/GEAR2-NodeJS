const OrgStore = require('../stores/organization');
const AppStore = require('../stores/application');

const orgStore = new OrgStore();
const appStore = new AppStore();

function findAll(req, res) {
  orgStore.search(`CALL get_organization_detail(0);`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  orgStore.search(`CALL get_organization_detail( ${req.params.id} )`, (results) => {
    res.json(results);
  });
}

function findApplications(req, res) {
  appStore.search(`call get_application_detail( ${req.params.id}, 'o')`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findApplications,
  findAll,
  findOne,
};
