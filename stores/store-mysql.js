/* eslint no-console: ["error", { allow: ["error"] }] */
const mysql = require('mysql');
// const dbconfig = require('../.securables/database');

/* const connection = mysql.createConnection(dbconfig.connection);
connection.query(`USE ${dbconfig.database};`);
 */
const connection = mysql.createConnection({
		host: 'localhost',
        user: 'root',
        password: '19861029'
	
	
});
connection.query(`USE cowboy_ods;`);

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
  
    search(sql, done) {
    const request = connection.query(sql, (err, rows) => {
		
		// console.log(rows[0]);
      if (err) {
        this.data.push(err);
		done.call(done, this.data);
      } else {

		 this.data = [];
		 for (var i = 0; i< rows[0].length; i ++){
			this.data.push(this.model.apply(rows[0][i]));
		 }
		 done.call(done, this.data);
		 // console.log(rows[0]);
		 
         // this.data.push(rows);
        
      }
    });
	
	
	// done.call(done, this.data);
  }
}

module.exports = StoreMySql;
