const Model = require('./model');

class ParentSystemModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'int',
        mapping(data) {
          return data.ID;
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
        name: 'SSO',
        type: 'string',
		mapping(o) {
          return o.orgSSO || o.SSO;
        },

      },
	  {
        name: 'old_Id',
        type: 'string',
      },
    ];
  }
}

module.exports = ParentSystemModel;
