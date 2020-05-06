const CapabilityStore = require('../stores/capability');

const capabilityStore = new CapabilityStore();

function findAll(req, res) {
  capabilityStore.search(`CALL get_capability_by_org(0);`, (results) => {
    res.json(results);
  });
}

function findSSO(req, res) {
  capabilityStore.search(`CALL get_capability_by_org( \'${req.params.name}\' );`, (results) => {
    res.json(results);
  });
}


module.exports = {
  findAll,
  findSSO,
};
