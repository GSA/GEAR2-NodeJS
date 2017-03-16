const Model = require('./model');

class Fismapoc extends Model {
  constructor(f) {
    super(f);

    this.fields = this.fields.concat([
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
        // mapping(data) {
          // return data['Application Type'];
        // },
      },
      {
        name: 'RelOrgDisplayName',
        type: 'string',
        // mapping(data) {
          // return data.Description;
        // },
      },
	  {
        name: 'FIPS199',
        type: 'string',
      },
      {
        name: 'ISSO',
        type: 'string',
         // mapping(data) {
           // return data['POC Type'];
         // },
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
        name: 'PM',
        type: 'string',
      },
    ]);
  }
}

module.exports = Fismapoc;
