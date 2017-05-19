const Interfacev2Store = require('../stores/interfacev2');

const interfacev2Store = new Interfacev2Store();

function findAll(req, res) {

  interfacev2Store.query(`SELECT * FROM SAODS.udfGetAppInterfacesv2()`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
};
