/* eslint no-console: ["error", { allow: ["error"] }] */
const tedious = require('tedious');
const gearConfig = require('../../../.securables/gear-config');

const Connection = tedious.Connection;
const Request = tedious.Request;

class Store {
  constructor() {
    this.model = null;
    this.data = [];
    this.databaseSettings = gearConfig.databaseSettings;
  }
  setModel(m) {
    this.model = m;
  }
  query(sql, cb) {
    const connection = new Connection(this.databaseSettings.connection);
    connection.on('connect', (err) => {
      if (err) {
        console.error(err);
        cb.call(cb, {
          status: 500,
          error: err,
        });
      } else {
        // the callback passed into a new Request is executed last, on 'completed'
        const request = new Request(sql, (reqErr) => {
          if (reqErr) {
            cb.call(cb, {
              status: 500,
              error: reqErr,
            });
          } else {
            cb.call(cb, this.data);
          }
        });
        // a 'columnMetadata' event fires first, just before row data is sent back
        request.on('columnMetadata', () => {
          this.data = [];
        });
        // 'row' events start firing after 'columnMetadata'
        request.on('row', (columns) => {
          const obj = {};
          columns.forEach((column) => {
            obj[column.metadata.colName] = column.value;
          });
          this.data.push(this.model.apply(obj));
        });
        connection.execSql(request);
      }
    });
  }
}

module.exports = Store;
