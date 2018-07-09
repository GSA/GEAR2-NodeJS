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
        name: 'Alias',
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
		mapping(o) {
          return o.RelOrgDisplayName || o.orgName || o.OwnerShort;
        },
      },
      {
        name: 'ParentSystem',
        type: 'string',
        mapping(d) {
        return d.System || d.ParentSystem;
        },

      },
	  {
        name: 'BusPOC',
        type: 'string',
      },
	  {
        name: 'TechPOC',
        type: 'string',
      },
/*       {
        name: 'System',
        type: 'string',

      }, */
      {
        name: 'BusinessPOC',
        type: 'string',
         mapping(d) {
          let pocs = null;
		  let poc = null;
		  let poc1 = [];
		  if (d.BusinessPOC){
				  pocs = d.BusinessPOC.split(';');
				  pocs = pocs.map((poc, cb) =>
				{
					 var pieces = poc.split(',');
					 var cb =   "<a href=mailto:" + pieces[1] + ">" + pieces[0] + "</a>";// + "<br>" ;
					//console.log(cb);
					poc1.push(cb);						
				})
		  }
          return poc1;
        }, 
      },
      {
        name: 'TechnicalPOC',
        type: 'string',
         mapping(d) {
          let pocs = null;
		  let poc = null;
		  let poc1 = [];
		  if (d.TechnicalPOC){
				  pocs = d.TechnicalPOC.split(';');
				  pocs = pocs.map((poc, cb) =>
				{
					 var pieces = poc.split(',');
					 var cb =   "<a href=mailto:" + pieces[1] + ">" + pieces[0] + "</a>";// + "<br>" ;
					//console.log(cb);
					poc1.push(cb);						
				})
		  }
          return poc1;
        }, 
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
	    mapping(d) {
          let apptime = null;
		  let cb = '';
          if (d.AppTime) {
            apptime = d.AppTime.split('; ');
            apptime = apptime.map((art) => {
              const pieces = art.split(',');
              if(pieces[0] == 'FY14')
				cb = pieces[1] ;
            });
          }
          return cb;
        },
      },
      {
        name: 'FY15',
        type: 'string',
	    mapping(d) {
          let apptime = null;
		  let cb = '';
          if (d.AppTime) {
            apptime = d.AppTime.split('; ');
            apptime = apptime.map((art) => {
              const pieces = art.split(',');
              if(pieces[0] == 'FY15')
				cb = pieces[1] ;
            });
          }
          return cb;
        },
      },
      {
        name: 'FY16',
        type: 'string',
	    mapping(d) {
          let apptime = null;
		  let cb = '';
          if (d.AppTime) {
            apptime = d.AppTime.split('; ');
            apptime = apptime.map((art) => {
              const pieces = art.split(',');
              if(pieces[0] == 'FY16')
				cb = pieces[1] ;
            });
          }
          return cb;
        },		
      },
      {
        name: 'FY17',
        type: 'string',
	    mapping(d) {
          let apptime = null;
		  let cb = '';
          if (d.AppTime) {
            apptime = d.AppTime.split('; ');
            apptime = apptime.map((art) => {
              const pieces = art.split(',');
              if(pieces[0] == 'FY17')
				cb = pieces[1] ;
            });
          }
          return cb;
        },
      },
      {
        name: 'FY18',
        type: 'string',
	    mapping(d) {
          let apptime = null;
		  let cb = '';
          if (d.AppTime) {
            apptime = d.AppTime.split('; ');
            apptime = apptime.map((art) => {
              const pieces = art.split(',');
              if(pieces[0] == 'FY18')
				cb = pieces[1] ;
            });
          }
          return cb;
        },
      },
      {
        name: 'FY19',
        type: 'string',
	    mapping(d) {
          let apptime = null;
		  let cb = '';
          if (d.AppTime) {
            apptime = d.AppTime.split('; ');
            apptime = apptime.map((art) => {
              const pieces = art.split(',');
              if(pieces[0] == 'FY19')
				cb = pieces[1] ;
            });
          }
          return cb;
        },
      },
      {
        name: 'FY20',
        type: 'string',
	    mapping(d) {
          let apptime = null;
		  let cb = '';
          if (d.AppTime) {
            apptime = d.AppTime.split('; ');
            apptime = apptime.map((art) => {
              const pieces = art.split(',');
              if(pieces[0] == 'FY20')
				cb = pieces[1] ;
            });
          }
          return cb;
        },
      },
      {
        name: 'FY21',
        type: 'string',
	    mapping(d) {
          let apptime = null;
		  let cb = '';
          if (d.AppTime) {
            apptime = d.AppTime.split('; ');
            apptime = apptime.map((art) => {
              const pieces = art.split(',');
              if(pieces[0] == 'FY21')
				cb = pieces[1] ;
            });
          }
          return cb;
        },
      },
      {
        name: 'Notes',
        type: 'string',
      },
      {
        name: 'Link',
        type: 'string',
        mapping(d)
        {
          let s = '';
          if (d.Link && d.Link.indexOf('http://') !== 0 && d.Link.indexOf('https://') !== 0) 
          {
            s = 'http://' + d.Link;
          }
          else 
          {
           s = d.Link;
          }
          return s;
        },
      },
      {
        name: 'OMBUID',
        type: 'string',
      },
	  {
        name: 'ProdYear',
        type: 'string',
      },
	  {
        name: 'old_Id',
        type: 'string',
      },
    ]);
  }
}

module.exports = Application;
