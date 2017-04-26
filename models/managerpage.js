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
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=&FISMASystem=none&System=&Status=' target = '_blank'>" + d.NoFISMA + "</a>"
          return s;
        },

      },
      {
        name: 'NoInvest',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=&FISMASystem=&System=&Investment=none&Status=' target = '_blank'>" + d.NoInvest + "</a>"
          return s;
        },
      },
	  
      {
        name: 'NoPOCs',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=none&TechnicalPOC=none&System=&Status=' target = '_blank'>" + d.NoPOCs + "</a>"
          return s;
        },
      },
	  
      {
        name: 'NoOwnOrg',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!applications/find/Name=&SSO=&OwnerShort=none&BusinessPOC=&TechnicalPOC=&System=&Status=' target = '_blank'>" + d.NoOwnOrg + "</a>"
          return s;
        },
      },
	  
      {
        name: 'NoAppPlat',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=&TechnologyPlatform=none&System=&Status=' target = '_blank'>" + d.NoAppPlat + "</a>"
          return s;
        },
      },
      {
        name: 'NoTech',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=&Technologies=none&System=&Status=' target = '_blank'>" + d.NoTech + "</a>"
          return s;
        },
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
