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
		mapping(o){
			return o.FIPS_Impact_Level || o.FIPS199;
		}
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
		  let art = null;
		  let art1 = [];
		  if (d.RelatedArtifacts){
				  arts = d.RelatedArtifacts.split(';');
				  arts = arts.map((art, cb) =>
				{
					 var pieces = art.split(',');
					 var cb = '<a class="no-propagation" target="_blank" href="' + pieces[1] +  '">' + ' ' + pieces[0] + '</a>' ;
					art1.push(cb);						
				})
		  }
          return art1;
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
				 var cb = {
					Type: poctype[0],
					Name: pieces[0],
					Email: pieces[1],
					Phone: pieces[2],
				};
				pocs.push(cb);					
			}
			})
		  }
          return pocs;
        },		
      },
       {
        name: 'ISSO',
        type: 'string',
        mapping(d) {
          let poc = null;
          let poctype = null;
		  let pocs = '';
          if (d.ISSO) {
            poctype = d.ISSO.split(':');
            poc = poctype[1].split('; ');
            poc = poc.map((art) => {
              const pieces = art.split(',');
              var cb = '-';
			  if (pieces[0] !== '') 
				  cb = pieces[0] + " " + '<br>' +  "<a href=mailto:" + pieces[1] + ">" + pieces[1] + "</a>" + " " + (('<br>' + pieces[2]) || '') + "<br>" ;//+ (pieces[2] || '');
			  pocs += cb;
            });
          }
          return pocs;
        },		
      },
      {
        name: 'ISSM',
        type: 'string',
        mapping(d) {
          let poc = null;
          let poctype = null;
		  let pocs = [];
          if (d.ISSM) {
            poctype = d.ISSM.split(':');
            poc = poctype[1].split('; ');
            poc = poc.map((art) => {
              const pieces = art.split(',');
			  var cb = '-';
			  if (pieces[0] !== '') 
				cb = (pieces[0] + " " + '<br>' + "<a href=mailto:" + pieces[1] + ">" + pieces[1] + "</a>" + " " + (('<br>' + pieces[2]) || '') + "<br>") || '-' ;//+ (pieces[1] || '');
			  pocs += cb;
            });
          }
          return pocs;
        },
      },
      {
        name: 'AO',
        type: 'string',		
      },
      {
        name: 'Authorizing Official',
        type: 'string',
        mapping: 'AO',
		mapping(d) {
          let poc = null;
          let poctype = null;
		  let pocs = [];
          if (d.AO) {
            poctype = d.AO.split(':');
            poc = poctype[1].split('; ');
            poc = poc.map((art) => {
              const pieces = art.split(',');
			  var cb = '-';
			  if (pieces[0] !== '')

				cb = pieces[0] + " " + '<br>' + "<a href=mailto:" + pieces[1] + ">" + pieces[1] + "</a>" + " " + (('<br>' + pieces[2]) || '') + "<br>" ;//+ (pieces[1] || '');

				pocs += cb;
            });
          }
          return pocs;
        },
      },
       {
        name: 'SO',
        type: 'string',
      }, 
      {
        name: 'System Owner',
        type: 'string',

        mapping: 'SO'||'Program Manager'||'System Owner',
	    mapping(d) {
          let poc = null;
          let poctype = null;
		  let pocs = [];
          if (d.SO) {
            poctype = d.SO.split(':');
            poc = poctype[1].split('; ');
            poc = poc.map((art) => {
              const pieces = art.split(',');
			  var cb = '-';
			  if (pieces[0] !== '') 
				cb = pieces[0] + " " + '<br>' + "<a href=mailto:" + pieces[1] + ">" + pieces[1] + "</a>" + " " + (('<br>' + pieces[2]) || '') + "<br>" ;//+ (pieces[1] || '');
			  pocs += cb;
            });
          }
          return pocs;
        },
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
        {
            name: 'SystemLevel',
            type: 'string'
        },
        {
            name: 'ParentSystem',
            type: 'string'
        }
    ];
  }
}

module.exports = FISMAModel;
