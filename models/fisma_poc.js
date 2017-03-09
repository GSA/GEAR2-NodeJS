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
        name: 'Email',
        type: 'string',
        // mapping(data) {
          // return data.Description;
        // },
      },
      {
        name: 'Phone',
        type: 'string',
      },
      {
        name: 'Type',
        type: 'string',
         mapping(data) {
           return data['POC Type'];
         },
      },
    ]);
  }
}

module.exports = Fismapoc;
