const Model = require('./model');

class CapModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'ID',
        type: 'int',
        // mapping(data) {
          // return data.ID;
        // },
      },
      {
        name: 'Name',
        type: 'string',
        // mapping(data) {
          // return data.Name;
        // },
      },
      {
        name: 'Description',
        type: 'string',
        // mapping(data) {
          // return data.Description;
        // },
      },
      {
        name: 'ReferenceNum',
        type: 'string',
        // mapping(data) {
          // return data.ReferenceNum;
        // },
      },
	  {
        name: 'Parent',
        type: 'string',
        // mapping(data) {
          // return data.Parent;
        // },
      },
    ];
  }
}

module.exports = CapModel;
