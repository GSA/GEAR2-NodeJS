const Model = require('./model');

class ITStandardsModel extends Model {
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
        name: 'Name',
        type: 'string',

      },
      {
        name: 'Description',
        type: 'string',

      },

      {
        name: 'Type',
        type: 'string',

      },

      {
        name: 'Category',
        type: 'string',

      },

      {
        name: 'Status',
        type: 'string',

      },
      {
        name: 'DeploymentType',
        type: 'string',

      },
      {
        name: 'Comments',
        type: 'string',

      },
      {
        name: 'POC',
        type: 'string',

      },
      {
        name: 'TwoLetterOrgPOC',
        type: 'string',

      },
      {
        name: 'ReferenceDocuments',
        type: 'string',
		mapping(d) {
          let its = null;
		  let s = [];
		  if (d.ReferenceDocuments){
				  its = d.ReferenceDocuments.split(';');
				  its = its.map((it, cb) =>
				{
					 cb =  '<a class="no-propagation" target="_blank" href="' + it +  '">' + ' ' + it + '</a>' ;
					console.log(cb);
					s.push(cb);
				})
				console.log(s);
		  }
		   else{
            s.push(d.ReferenceDocuments);
          }
          return s;
        },
      },
 	    {
        name: 'Refdocdetail',
        type: 'string',
		mapping(d) {
          let its = null;
		  let s = [];
		  if (d.ReferenceDocuments){
				  its = d.ReferenceDocuments.split(';');
				  its = its.map((it, cb) =>
				{
					// cb =  '<a class="no-propagation" target="_blank" href="' + it +  '">' + ' ' + it + '</a>' ;
					cb =  it;
					//console.log(cb);
					s.push(cb);
				})
				//console.log(s);
		  }
		   else{
            s.push(d.ReferenceDocuments);
          }
          return s;
        },
      },
      {
        name: 'ApprovalExpirationDate',
        type: 'string',
 		mapping(d){
			if(d.ApprovalExpirationDate){
			let s = d.ApprovalExpirationDate.toISOString();
			return s.substring(0,10);}
		},

      },
    ];
  }
}

module.exports = ITStandardsModel;
