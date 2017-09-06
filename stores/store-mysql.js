/* eslint no-console: ["error", { allow: ["error"] }] */
const mysql = require('mysql');
const dbconfig = require('../.securables/database');

const connection = mysql.createConnection(dbconfig.connection);
connection.query(`USE ${dbconfig.database};`);

class StoreMySql {
  constructor() {
    this.model = null;
    this.data = [];
  }
  setModel(m) {
    this.model = m;
  }
  create(done) {
    connection.query(`CALL sp_create();`, (err, rows) => {
      // console.log('INSERT: ' + rows);
      done(err, rows[0]);
    });
  }
}

module.exports = StoreMySql;
