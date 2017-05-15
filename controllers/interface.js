const InterfaceStore = require('../stores/interface');

const interfaceStore = new InterfaceStore();

function findAll(req, res) {
  let filter = '';
  if (req.query.owner) {
    filter = ` WHERE Owner1 LIKE '%${req.query.owner}%' or Owner2 LIKE '%${req.query.owner}%'`;
  }
  interfaceStore.query(`SELECT * FROM SAODS.udfGetAppInterfaces() ${filter} ORDER BY Owner1`, (results) => {
    res.set({
      'X-Record-Count': results.length,
    });
    res.json(results);
  });
}

module.exports = {
  findAll,
};
