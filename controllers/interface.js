const InterfaceStore = require('../stores/interface');

const interfaceStore = new InterfaceStore();

function findAll(req, res) {
  let filter = '';
  if (req.query.owner) {
    filter = ` WHERE Owner1 LIKE '%${req.query.owner}%' or Owner2 LIKE '%${req.query.owner}%' ORDER BY Owner1, Owner2`;
  }
  if (req.query.sys) {
    filter = ` WHERE System1 LIKE '%${req.query.sys}%' or System2 LIKE '%${req.query.sys}%' ORDER BY System1, System2`;
  }
  interfaceStore.query(`SELECT * FROM SAODS.udfGetAppInterfaces() ${filter} `, (results) => {
    res.set({
      'X-Record-Count': results.length,
    });
    res.json(results);
  });
}

module.exports = {
  findAll,
};
