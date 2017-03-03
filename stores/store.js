/* eslint no-console: ["error", { allow: ["error"] }] */
const tedious = require('tedious');
const databaseSettings = require('../.securables/gear-config').databaseSettings;

const Connection = tedious.Connection;
const Request = tedious.Request;

class Store {
  constructor() {
    this.model = null;
    this.data = [];
  }
  setModel(m) {
    this.model = m;
  }
  query(sql, cb) {
    const connection = new Connection(databaseSettings.connection);
    connection.on('connect', (err) => {
      if (err) {
        console.error(err);
        cb.call(cb, {
          status: 500,
          error: err,
        });
      } else {
        this.data = [];
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
