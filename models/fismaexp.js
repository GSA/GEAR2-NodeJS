const Model = require('./model');

class FISMAexpModel extends Model {
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
        name: 'RelOrgDisplayName',
        type: 'string',
		mapping(o) {
          return o.RelOrgDisplayName || o.orgName;
        },
      },
      {
        name: 'FedContractorLoc',
        type: 'string',
      },
      {
        name: 'FIPS199',
        type: 'string',
      },
      {
        name: 'ATODate',
        type: 'string',
 		mapping(d){
			if(d.ATODate){
			let s = d.ATODate.toISOString();
			return s.substring(0,10);}
		}, 
      },
      {
        name: 'ATOType',
        type: 'string',
      },
      {
        name: 'RenewalDate',
        type: 'string',
 		mapping(d){
			if(d.RenewalDate){
			let s = d.RenewalDate.toISOString();
			return s.substring(0,10);}
		},
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
        name: 'System Owner',
        type: 'string',
        mapping: 'PM'||'Program Manager',
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
        name: 'PII',
        type: 'string',
      },
	  {
        name: 'CloudYN',
        type: 'string',
      },
	  {
        name: 'CSP',
        type: 'string',
      },
	  {
        name: 'ServiceType',
        type: 'string',
      },
	  {
		name: 'InactiveDate',
		type: 'string',
 		mapping(d){
			if(d.InactiveDate){
			let s = d.InactiveDate.toISOString();
			return s.substring(0,10);}
		},
	
	  },
	  {
        name: 'old_Id',
        type: 'string',
      },
    ];
  }
}

module.exports = FISMAexpModel;
