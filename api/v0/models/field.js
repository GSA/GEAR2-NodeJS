class Field {
  constructor(cfg) {
    this.cfg = cfg;
    this.name = '';
    this.type = '';
    this.mapping = function mapping() { return false; };
  }
  validate() {
    if (typeof this.cfg === 'object') {
      Object.keys(this.cfg).forEach((key) => {
        switch (key) {
          case 'name':
          case 'type':
            return true;
          default:
            return false;
        }
      });
    } else {
      throw (new Error('Not an Object. Cannot validate.'));
    }
    return this;
  }
}

module.exports = Field;
