/* eslint no-console: ["error", { allow: ["error"] }] */
const mysql = require('mysql');
const dbconfig = require('../../../.securables/gear-config');

const connection = mysql.createConnection(dbconfig.connection);
connection.query(`USE ${dbconfig.connection.database};`);

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

      done(err, rows[0]);
    });
  }

    search(sql, done) {
    const request = connection.query(sql, (err, rows) => {

      if (err) {
        this.data.push(err);
    done.call(done, this.data);
      } else {

     this.data = [];
     for (var i = 0; i< rows[0].length; i ++){
      this.data.push(this.model.apply(rows[0][i]));
     }
     done.call(done, this.data);

      }
    });

  }
}

module.exports = StoreMySql;
