const Model = require('./model');

class CapModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'Id',
        type: 'string',
        mapping(data) {
          return data.CapID || data.ID;
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
        name: 'Parent',
        type: 'string',
      },
      {
        name: 'ReferenceNum',
        type: 'string',
		mapping(o){
			return o.RefNum || o.ReferenceNum;
		}
      },
      // next 3 fields are used by cap visualization
      {
        name: 'AppCount',
        type: 'string',
      },
      {
        name: 'RefNum',
        type: 'string',
		mapping(o){
			return o.RefNum || o.ReferenceNum;
		}
      },
      {
        name: 'ParRefNum',
        type: 'string',
      },
      {
        name: 'Ref',
        type: 'string',
		mapping(o){
			return o.RefNum || o.ReferenceNum;
		}
      },
      {
        name: 'ParentCap',
        type: 'string',
      },
    ];
  }
}

module.exports = CapModel;
