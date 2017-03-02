const Model = require('./model');

class Application extends Model {
  constructor(f) {
    super(f);

    this.fields = this.fields.concat([
      {
        name: 'Alias',
        type: 'string',
        mapping: 'Aliases',
      },
      {
        name: 'ApplicationType',
        type: 'string',
        mapping(data) {
          return data['Application Type'];
        },
      },
      {
        name: 'BusinessPOC',
        type: 'string',
        mapping(data) {
          return data['Business POC'];
        },
      },
      {
        name: 'Cloud',
        type: 'string',
      },
      {
        name: 'Description',
        type: 'string',
        mapping(data) {
          return data.Description;
        },
      },
      {
        name: 'DesktopComponent',
        type: 'string',
        mapping(data) {
          return data['Desktop Component'];
        },
      },
      {
        name: 'HostingProvider',
        type: 'string',
        mapping(data) {
          return data['Hosting Provider'];
        },
      },
      {
        name: 'Investment',
        type: 'string',
        mapping(data) {
          return data.Investment;
        },
      },
      {
        name: 'IsRevenueGenerator',
        type: 'string',
        mapping(data) {
          return data.Revenue;
        },
      },
      {
        name: 'Owner',
        type: 'string',
        mapping(data) {
          return data['Owning Org'];
        },
      },
      {
        name: 'RegionClassification',
        type: 'string',
        mapping(data) {
          return data['Region Classification'];
        },
      },
      {
        name: 'SSO',
        type: 'string',
        mapping(data) {
          return data.SSO;
        },
      },
      {
        name: 'Status',
        type: 'string',
        mapping(data) {
          return data.Status;
        },
      },
      {
        name: 'System',
        type: 'string',
        mapping(data) {
          return data.System;
        },
      },
      {
        name: 'TechnicalPOC',
        type: 'string',
        mapping(data) {
          return data['Technical POC'];
        },
      },
      {
        name: 'TechnologyPlatform',
        type: 'string',
        mapping(data) {
          return data['Technology Platform'];
        },
      },
    ]);
  }
}

module.exports = Application;
