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
		mapping(o) {
          return o.RelOrgDisplayName || o.orgName;
        },
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
		mapping(d){
			let s = d.ATODate.toISOString();
			return s.substring(0,10);
		}
      },
      {
        name: 'ATOType',
        type: 'string',
      },
      {
        name: 'RenewalDate',
        type: 'string',
		mapping(d){
			let s = d.RenewalDate.toISOString();
			return s.substring(0,10);
		}
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
        name: 'POC',
        type: 'string',
        mapping(d) {
          let poc = null;
          let poc1 = null;
          let poctype = null;
		  let pocs = [];
          if (d.POC) {
            poc1 = d.POC.split('*');
			poc1 = poc1.map((poctype, cb) =>
			{
				poctype = poctype.split(':');
				poc = poctype[1].split('; ');
				for(var i = 0; i< poc.length; i++){
				 var pieces = poc[i].split(',');
			//	poc = poc.map((art) => {
				//  const pieces = art.split(',');
				 var cb = {
					Type: poctype[0],
					Name: pieces[0],
					Email: pieces[1],
				};
				pocs.push(cb);					
			}
			})
		  }
          return pocs;
        },		
      },
  /*     {
        name: 'ISSO',
        type: 'string',
        mapping(d) {
          let poc = null;
          let poctype = null;
          if (d.ISSO) {
            poctype = d.ISSO.split(':');
            poc = poctype[1].split('; ');
            poc = poc.map((art) => {
              const pieces = art.split(',');
              return {
				Type: poctype[0],
                Name: pieces[0],
                Email: pieces[1],
              };
            });
          }
          return poc;
        },		
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
      }, */
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
    ];
  }
}

module.exports = FISMAModel;
