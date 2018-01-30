const InterfaceStore = require('../stores/interface');

const interfaceStore = new InterfaceStore();

function findAll(req, res) {
  let filter = '';
  if (req.search.owner) {
    filter = ` WHERE owner1.Keyname LIKE \'%${req.search.owner}%\' or owner2.Keyname LIKE \'%${req.search.owner}%\' ORDER BY owner1.Keyname, owner2.Keyname`;
  }
  if (req.search.sys) {
    filter = ` WHERE sys1.Keyname LIKE \'%${req.search.sys}%\' or sys2.Keyname LIKE \'%${req.search.sys}%\' ORDER BY sys2.Keyname, sys2.Keyname`;
  }
  interfaceStore.search(`call get_application_interfaces( ${filter} )`, (results) => {
    res.set({
      'X-Record-Count': results.length,
    });
    res.json(results);
  });
}

module.exports = {
  findAll,
};
