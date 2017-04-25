/* eslint no-console: ["error", { allow: ["error"] }] */
const tedious = require('tedious');
const gearConfig = require('../.securables/gear-config');

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
        request.on('columnMetadata', () => {
          this.data = [];
        });
        request.on('row', (row) => {
          const obj = {};
          row.forEach((col) => {
            // using destructuring assignment for consciseness
            const { value: val, metadata: { colName: cname } } = col;
            obj[cname] = val;
          });
          this.data.push(obj);
        });
        connection.execSql(request);
      }
    });
  }
}

module.exports = Store;
