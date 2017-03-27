const Model = require('./model');

class FISMAModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      // {
        // name: 'FISMAID',
        // type: 'int',
        // mapping(data) {
          // return data.FISMAID || data.ID;
        // },
      // },
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
        name: 'TLO',
        type: 'string',
      },
      {
        name: 'Located',
        type: 'string',
      },
      {
        name: 'FIPS199',
        type: 'string',
      },
      {
        name: 'ATODate',
        type: 'string',
      },
      {
        name: 'ATOType',
        type: 'string',
      },
      {
        name: 'RenewalDate',
        type: 'string',
      },
      {
        name: 'ComplFISMA',
        type: 'string',
      },
      {
        name: 'RelatedArtifacts',
        type: 'string',
      },
      {
        name: 'FISMASystemIdentifier',
        type: 'string',
      },
      {
        name: 'ISSO',
        type: 'string',
      },
      {
        name: 'ISSM',
        type: 'string',
      },
      {
        name: 'AO',
        type: 'string',
      },
      {
        name: 'Authorizing Official',
        type: 'string',
        mapping: 'AO',
      },
      {
        name: 'PM',
        type: 'string',
      },
      {
        name: 'Program Manager',
        type: 'string',
        mapping: 'PM',
      },
      {
        name: 'RelOrgDisplayName',
        type: 'string',
      },
      {
        name: 'FedContractorLoc',
        type: 'string',
      },
    ];
  }
}

module.exports = FISMAModel;
