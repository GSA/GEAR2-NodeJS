const Model = require('./model');

class TechnologyModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'string',
        mapping(data) {
          return data.TechID;
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
        name: 'Description',
        type: 'string',
        mapping(data) {
          return data.Description;
        },
      },
      {
        name: 'Status',
        type: 'string',
        mapping(data) {
          return data.Status;
        },
      },
    ];
  }
}

module.exports = TechnologyModel;
