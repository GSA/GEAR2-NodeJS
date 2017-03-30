const Model = require('./model');

class FISMAModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'int',
        mapping: 'ID',
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
        name: 'RelOrgDisplayName',
        type: 'string',
      },
      {
        name: 'FedContractorLoc',
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
        name: 'RenewalDate',
        type: 'string',
      },
      {
        name: 'ComplFISMA',
        type: 'string',
      },
      {
        name: 'RelatedArtifacts',
        type: 'array',
        mapping(d) {
          let arts = null;
          if (d.RelatedArtifacts) {
            arts = d.RelatedArtifacts.split('; ');
            arts = arts.map((art) => {
              const pieces = art.split(',');
              return {
                Name: pieces[0],
                ReferenceDocuments: pieces[1],
              };
            });
          }
          return arts;
        },
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
