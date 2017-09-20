const FISMAStore = require('../stores/fisma');
const AppStore = require('../stores/application');
const POCStore = require('../stores/poc');

const fismaStore = new FISMAStore();
const appStore = new AppStore();
const pocStore = new POCStore();

function findAll(req, res) {
  fismaStore.search('CALL get_fisma_detail(0)', (results) => {
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
    });
  }
}

// children
 function findApplications(req, res) {
  appStore.search(`call get_application_detail( ${req.params.id}, 'f')`, (results) => {
    res.json(results);
  });
}
function findPOCs(req, res) {
   const filter = req.params.id ? req.params.id : 0;

  pocStore.search(`CALL get_fisma_detail( ${filter})`, (results) => {
    res.json(results);
  }); 
}
 
module.exports = {
  findApplications,
  findPOCs,
  findAll,
  findOne,
};
