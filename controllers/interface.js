const InterfaceStore = require('../stores/interface');

const interfaceStore = new InterfaceStore();

function findAll(req, res) {
  let filter = '';
  if (req.query.owner) {
    filter = ` \'WHERE ( owner1.Keyname LIKE \\\'%${req.query.owner}%\\\' or owner2.Keyname LIKE \\\'%${req.query.owner}%\\\') AND appstat1.Keyname <> \\\'Retired\\\'  AND appstat2.Keyname <> \\\'Retired\\\'  ORDER BY owner1.Keyname, owner2.Keyname \'`;
  }
  if (req.query.sys) {
    filter = ` \'WHERE ( sys1.Keyname LIKE \\\'%${req.query.sys}%\\\' or sys2.Keyname LIKE \\\'%${req.query.sys}%\\\') AND appstat1.Keyname <> \\\'Retired\\\'  AND appstat2.Keyname <> \\\'Retired\\\'  ORDER BY sys1.Keyname, sys2.Keyname \'`;
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
