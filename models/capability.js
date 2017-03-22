const Model = require('./model');

class CapabilityModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'string',
        mapping(data) {
          return data.CapID || data.ID;
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
        name: 'RefNumber',
        type: 'string',
      },
      {
        name: 'Parent',
        type: 'string',
      },
    ];
  }
}

module.exports = CapabilityModel;
