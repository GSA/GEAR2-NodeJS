const Model = require('./model');

class AppTIMEModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'ID',
        type: 'int',
        mapping(data) {
          return data.ID;
        },
      },
      {
        name: 'AppId',
        type: 'int',
        mapping(data) {
          return data.ID;
        },
      },
      {
        name: 'Alias',
        type: 'string',
      },
      {
        name: 'FY14',
        type: 'string',

      },
      {
        name: 'FY15',
        type: 'string',

      },
	  {
        name: 'FY16',
        type: 'string',

      },
	  {
        name: 'FY17',
        type: 'string',

      },
	  {
        name: 'FY18',
        type: 'string',

      },
	  {
        name: 'FY19',
        type: 'string',

      },
	  {
        name: 'FY20',
        type: 'string',

      },
	  {
        name: 'Name',
        type: 'string',

      },
	  {
        name: 'Owner',
        type: 'string',

      },
	  {
        name: 'RegionClassification',
        type: 'string',

      },
	  {
        name: 'SSO',
        type: 'string',

      },
	  {
        name: 'Status',
        type: 'string',

      },
	  // {
        // name: 'ParentSystem',
        // type: 'string',

      // },
	  {
        name: 'Notes',
        type: 'string',

      },
    ];
  }
}

module.exports = AppTIMEModel;
