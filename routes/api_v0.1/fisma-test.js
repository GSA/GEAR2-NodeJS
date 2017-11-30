const express = require('express');
const fismaCtrl = require('../../controllers/fisma');
const mysql = require('mysql');
const dbconfig = require('../../.securables/gear-config');
/* const connection = mysql.createConnection(dbconfig.connection);
connection.query(`USE ${dbconfig.database};`);
 */
const connection = mysql.createConnection({
		host: 'localhost',
        user: 'root',
        password: '19861029'
	
	
});
connection.query(`USE cowboy_ods;`);

const router = express.Router();

router.route('/')
  .get((req, res) => {
    connection.query(`CALL get_fisma_detail(0);`, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.json({rows: rows});
      }
    });
  })
  .post((req, res) => {
    connection.query(`CALL sp_create('apps', 'appName', ${mysql.escape(req.body.name)});`, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.send('OK!\n' + rows);
      }
    });
  });

router.route('/:id')
  .get((req, res) => {
    connection.query(`CALL get_fisma_detail(${mysql.escape(req.params.id)});`, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.json({rows: rows[0]});
      }
    });
  })
  .put((req, res) => {
    connection.query(`CALL sp_upd_fisma_basic(${mysql.escape(req.params.id)}, ${mysql.escape(req.body.name)}, ${mysql.escape(req.body.desc)});`, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.json({rows: rows});
      }
    });
  })
  .delete((req, res) => {
    connection.query(`CALL sp_del_fisma_basic(${mysql.escape(req.params.id)});`, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.json({rows: rows});
      }
    });
  });

module.exports = router;
