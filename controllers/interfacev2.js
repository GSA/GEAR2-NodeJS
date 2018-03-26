const Interfacev2Store = require('../stores/interfacev2');

const interfacev2Store = new Interfacev2Store();

function findAll(req, res) {

  interfacev2Store.search(`call get_application_interfacesv3(0)`, (results) => {
    res.json(results);
  });
}
function findOne(req, res) {
  interfacev2Store.search(`call get_application_interfacesv3( ${req.params.id}`, (results) => {
    res.json(results);
  });
}
module.exports = {
  findAll,
  findOne,
};
