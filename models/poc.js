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
          return data.Keyname || data.name || data.Name;
        },
      },
      {
        name: 'Phone',
        type: 'string',
      },
      {
        name: 'Email',
        type: 'string',
      },
	   {
        name: 'Region',
        type: 'string',
		mapping(data) {
          return data.Region || data.RISSO;
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
      {
        name: 'Organization',
        type: 'string',
      },
	  
    ];
  }
}

module.exports = POCModel;
