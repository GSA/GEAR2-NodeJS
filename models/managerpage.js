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
            s = "<a href='#!/applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=&FismaSystem=none' target = '_blank'>" + d.NoFISMA + "</a>"
          return s;
        },

      },
      {
        name: 'NoInvest',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!/applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=&FISMASystem=&System=&Investment=none&Status=' target = '_blank'>" + d.NoInvest + "</a>"
          return s;
        },
      },
	  
      {
        name: 'NoPOCs',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = d.NoPOCs  
                +"<br/>"+"<a href='#!/applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=none&TechnicalPOC=&System=&Status=' target = '_blank'> Missing Business POCs</a>"
                +"<br/>"+"<a href='#!/applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=none&System=&Status=' target = '_blank'> Missing Technical POCs</a>"
          return s;
        },
      },
	  
      {
        name: 'NoOwnOrg',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!/applications/find/Name=&SSO=&OwnerShort=none&BusinessPOC=&TechnicalPOC=&System=&Status=' target = '_blank'>" + d.NoOwnOrg + "</a>"
          return s;
        },
      },
	  
      {
        name: 'NoAppPlat',
        type: 'int',
         mapping(d)
        {
          let s = '';          
            s = "<a href='#!/applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=&TechnologyPlatform=none&System=&Status=' target = '_blank'>" + d.NoAppPlat + "</a>"
          return s;
        },
      },
      {
        name: 'NoTech',
        type: 'int',
         // mapping(d)
        // {
          // let s = '';          
            // s = "<a href='#!/applications/find/Name=&SSO=&OwnerShort=&BusinessPOC=&TechnicalPOC=&System=&Status=&Technologies=none' target = '_blank'>" + d.NoTech + "</a>"
          // return s;
        // },
      },

    ];
  }
}

module.exports = MNGtandardsModel;
