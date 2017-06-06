const Model = require('./model');

class Interfacev2Model extends Model {
  constructor(f) {
    super(f);
    this.fields = [
	{
        name: 'srcAppid',
        type: 'int',
      },
	  {
        name: 'destAppid',
        type: 'int',
      },
	  {
        name: 'srcApp',
        type: 'string',
      },
      {
        name: 'srcApp',
        type: 'string',
      },
      {
        name: 'destApp',
        type: 'string',
      },
      {
        name: 'Count',
        type: 'int',
      },
      {
        name: 'PII',
        type: 'string',
      },
    ];
  }
}

module.exports = Interfacev2Model;
