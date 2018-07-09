const Model = require('./model');

class OrganizationModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'int',
        mapping(data) {
          return data.ID || data.OrgID;
        },
      },
      {
        name: 'Name',
        type: 'string',

      },
      {
        name: 'DisplayName',
        type: 'string',

      },
      {
        name: 'Description',
        type: 'string',

      },
      {
        name: 'Parent',
        type: 'string',

      },
	  {
        name: 'old_Id',
        type: 'string',
      },
    ];
  }
}

module.exports = OrganizationModel;
