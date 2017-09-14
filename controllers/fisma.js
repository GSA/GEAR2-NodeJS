const FISMAStore = require('../stores/fisma');
//const AppStore = require('../stores/application');
//const POCStore = require('../stores/poc');

const fismaStore = new FISMAStore();
//const appStore = new AppStore();
//const pocStore = new POCStore();

function findAll(req, res) {
  fismaStore.search('CALL get_fisma_detail(0)', (results) => {
	  console.log(results);
    res.json(results);
  });
}

// TODO: make sure we're using next() properly
function findOne(req, res, next) {
  if (req.params.id === 'pocs') {
    next();
  } else {
    fismaStore.search(`CALL get_fisma_detail( ${req.params.id})`, (results) => {
      res.json(results);
	  console.log(results);
    });
  }
}

// children
/* function findApplications(req, res) {
  appStore.search(`SELECT * FROM SAODS.udfGetAppDetails(${req.params.id}, 'f')`, (results) => {
    res.json(results);
  });
}
function findPOCs(req, res) {
  const filter = req.params.id ? `WHERE ID = ${req.params.id}` : '';

  pocStore.search(`SELECT * FROM SAODS.udfGetPOCDetails('f') ${filter}`, (results) => {
    res.json(results);
  });
}
 */
module.exports = {
//  findApplications,
  // findPOCs,
  findAll,
  findOne,
};
