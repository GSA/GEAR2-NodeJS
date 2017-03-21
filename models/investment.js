const Model = require('./model');

class InvestmentModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'string',
        mapping(o) {
          return o.InvID;
        },
      },
      {
        name: 'Name',
        type: 'string',
      },
      {
        name: 'Description',
        type: 'string',
      },
      {
        name: 'Type',
        type: 'string',
      },
      {
        name: 'PSA',
        type: 'string',
      },
      {
        name: 'SSA',
        type: 'string',
      },
      {
        name: 'InvManager',
        type: 'string',
      },
      {
        name: 'UII',
        type: 'string',
      },
    ];
  }
}

module.exports = InvestmentModel;
