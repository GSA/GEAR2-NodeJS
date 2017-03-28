const Model = require('./model');

class Application extends Model {
  constructor(f) {
    super(f);

    this.fields = this.fields.concat([
      {
        name: 'Description',
        type: 'string',
      },
      {
        name: 'SSO',
        type: 'string',
      },
	  {
        name: 'SSOShort',
        type: 'string',
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
        name: 'SSOShort',
        type: 'string',
      },
      {
        name: 'Owner',
        type: 'string',
      },
      {
        name: 'System',
        type: 'string',
      },
      {
        name: 'BusinessPOC',
        type: 'string',
      },
      {
        name: 'TechnicalPOC',
        type: 'string',
      },
      {
        name: 'Cloud',
        type: 'string',
      },
      {
        name: 'TechnologyPlatform',
        type: 'string',
      },
      {
        name: 'Status',
        type: 'string',
      },
      {
        name: 'Alias',
        type: 'string',
      },
      {
        name: 'RegionClassification',
        type: 'string',
      },
      {
        name: 'HostingProvider',
        type: 'string',
      },
      {
        name: 'FISMASystem',
        type: 'string',
      },
      {
        name: 'Investment',
        type: 'string',
      },
      {
        name: 'IsRevenueGenerator',
        type: 'string',
      },
      {
        name: 'DesktopComponent',
        type: 'string',
      },
      {
        name: 'RetiredYear',
        type: 'string',
      },
      {
        name: 'Capabilities',
        type: 'string',
      },
      {
        name: 'Technologies',
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
        name: 'Notes',
        type: 'string',

      },

    ]);
  }
}

module.exports = Application;
