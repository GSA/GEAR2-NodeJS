const Model = require('./model');

class InterfaceModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'AppID1',
        type: 'string',
      },
      {
        name: 'Name1',
        type: 'string',
		mapping(o) {
			console.log(o);
          return o.Name1 ;
        },
      },
      {
        name: 'NameShort1',
        type: 'string',
      },
      {
        name: 'SSO1',
        type: 'string',
      },
      {
        name: 'SSOShort1',
        type: 'string',
      },
      {
        name: 'Owner1',
        type: 'string',
      },
      {
        name: 'OwnerShort1',
        type: 'string',
      },
      {
        name: 'System1',
        type: 'string',
      },
      {
        name: 'AppID2',
        type: 'string',
      },
      {
        name: 'Name2',
        type: 'string',
      },
      {
        name: 'NameShort2',
        type: 'string',
      },
      {
        name: 'SSO2',
        type: 'string',
      },
      {
        name: 'SSOShort2',
        type: 'string',
      },
      {
        name: 'Owner2',
        type: 'string',
      },
      {
        name: 'OwnerShort2',
        type: 'string',
      },
      {
        name: 'System2',
        type: 'string',
      },
    ];
  }
}

module.exports = InterfaceModel;
