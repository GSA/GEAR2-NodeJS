const Model = require('./model');

class Interfacev2Model extends Model {
  constructor(f) {
    super(f);
    this.fields = [
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
