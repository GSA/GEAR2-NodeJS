const Model = require('./model');

class ITStandardsModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
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
        name: 'ReferenceDocuments',
        type: 'string',

      },
      {
        name: 'ApprovalExpirationDate',
        type: 'string',

      },
    ];
  }
}

module.exports = ITStandardsModel;
