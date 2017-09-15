class Model {
  constructor(f) {
    this.fields = [
      {
        name: 'Id',
        type: 'number',
        mapping(o) {
          return o.Id || o.ID;
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

	data = data;
    const obj = {};

    this.fields.forEach((field) => {
      switch (typeof field.mapping) {
        case 'function':
          obj[field.name] = field.mapping.call(field.mapping, data) || null;
          break;
        case 'string':
          if (Object.hasOwnProperty.call(data, field.mapping)) {
            obj[field.name] = data[field.mapping];
          }
          break;
        default:
          if (Object.hasOwnProperty.call(data, field.name)) {
            obj[field.name] = data[field.name];
          }
          break;
      }
    });
    return obj;
  }
}

module.exports = Model;
