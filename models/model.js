class Model {
  constructor(f) {
    this.fields = [
      {
        name: 'Id',
        type: 'string',
        mapping(d) {
          return d.ID;
        },
      },
      {
        name: 'Name',
        type: 'string',
      },
    ];
    if (Array.isArray(f)) {
      this.fields = this.fields.concat(f);
    }
  }
  apply(data) {
    const obj = {};
    this.fields.forEach((field) => {
      switch (typeof field.mapping) {
        case 'function':
          obj[field.name] = field.mapping.call(field.mapping, data) || null;
          break;
        case 'string':
          obj[field.name] = data[field.mapping] || null;
          break;
        default:
          obj[field.name] = data[field.name] || null;
          break;
      }
    });
    return obj;
  }
}

module.exports = Model;
