const Model = require('./model');

class POCModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'string',
        mapping(data) {
          return data.ID;
        },
      },
      {
        name: 'Name',
        type: 'string',
        mapping(data) {
          return data.Name;
        },
      },
      {
        name: 'Email',
        type: 'string',
        mapping(data) {
          return data.Email;
        },
      },
      {
        name: 'Type',
        type: 'string',
        mapping(data) {
          return data['POC Type'];
        },
      },
    ];
  }
}

module.exports = POCModel;
