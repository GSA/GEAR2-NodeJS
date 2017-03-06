const Model = require('./model');

class FISMAModel extends Model {
  constructor(f) {
    super(f);
    this.fields = [
      {
        name: 'FISMAID',
        type: 'int',
        mapping(data) {
          return data.FISMAID;
        },
      },
      {
        name: 'Name',
        type: 'string',

      },
      {
        name: 'TLO',
        type: 'string',

      },
      {
        name: 'Located',
        type: 'string',

      },
      {
        name: 'FIPS199',
        type: 'string',

      },
	        {
        name: 'ATODate',
        type: 'string',

      },
	        {
        name: 'ATOType',
        type: 'string',

      },
	        {
        name: 'ATORenewal',
        type: 'string',

      },
	        {
        name: 'Complete',
        type: 'string',

      },
	        {
        name: 'RelatedArtifacts',
        type: 'string',

      },
	        {
        name: 'Identifier',
        type: 'string',

      },
	        {
        name: 'ISSO',
        type: 'string',

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
	  ];
  }
}

module.exports = FISMAModel;
