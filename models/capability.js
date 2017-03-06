const Model = require('./model');

class CapabilityModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'string',
        mapping(data) {
          return data.CapID;
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
        name: 'Ref',
        type: 'string',
        mapping(data) {
          return data.Ref;
        },
      },
    ];
  }
}

module.exports = CapabilityModel;
