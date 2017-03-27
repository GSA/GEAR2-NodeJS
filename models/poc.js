const Model = require('./model');

class POCModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'ParentId',
        type: 'string',
        mapping(data) {
          return data.ID || data.ObjID;
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
        name: 'Owner',
        type: 'string',
      },
	  {
        name: 'OwnerShort',
        type: 'string',
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
