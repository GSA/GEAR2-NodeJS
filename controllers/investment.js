const InvestmentStore = require('../stores/investment');

const investmentStore = new InvestmentStore();

function findAll(req, res) {
  let fields = '*';

  if (Object.hasOwnProperty.call(req.query, 'fields')) {
    fields = req.query.fields;
  }
  investmentStore.query(`SELECT ${fields} FROM SAODS.udfGetInvList()`, (results) => {
    res.json(results);
  });
}

function findOne(req, res) {
  investmentStore.query(`SELECT * FROM SAODS.udfGetInvList() WHERE InvID = ${req.params.id}`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findAll,
  findOne,
};
