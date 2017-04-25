const Model = require('./model');

class MNGtandardsModel extends Model {
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
        name: 'NoFISMA',
        type: 'int',

      },
      {
        name: 'NoInvest',
        type: 'int',

      },
	  
      {
        name: 'NoPOCs',
        type: 'int',

      },
	  
      {
        name: 'NoOwnOrg',
        type: 'int',

      },
	  
      {
        name: 'NoAppPlat',
        type: 'int',

      },
      {
        name: 'NoTech',
        type: 'int',

      },

      /* {
        name: 'ReferenceDocuments',
        type: 'string',
        mapping(d)
        {
          let s = '';
          if(d.ReferenceDocuments){
            s = "<a href=" + "'" + d.ReferenceDocuments + "'" + "target = '_blank'>" + d.ReferenceDocuments + "</a>"
          }
          else{
            s = d.ReferenceDocuments;
          }
          return s;
        },
      },
 */     
    ];
  }
}

module.exports = MNGtandardsModel;
