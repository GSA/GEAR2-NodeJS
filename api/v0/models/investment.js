const Model = require('./model');

class InvestmentModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'ID',
        type: 'string',
        mapping(o) {
          return o.ID;
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
        name: 'InvManagerEmail',
        type: 'string',
      },
      {
        name: 'UII',
        type: 'string',
      },
	  {
        name: 'POC',
        type: 'string',
      },
	  {
        name: 'old_Id',
        type: 'string',
      },
    ];
  }
}

module.exports = InvestmentModel;
