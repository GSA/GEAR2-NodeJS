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
      } else {
		  
		// console.log('>> results: ', rows[0] );
        // var string=JSON.stringify(rows[0]);
        // console.log('>> string: ', string );
        // var json =  JSON.parse(row[0]);
        // console.log('>> json: ', rows[0]);

		// this.data = rows[0];
		// console.log(this.data);
        // this.model.list = json;
        // this.data.push(this.model.apply(json));
		
         this.data.push(this.model.apply(rows));
        
      }
    });
	
	
	done.call(done, this.data);
  }
}

module.exports = StoreMySql;
