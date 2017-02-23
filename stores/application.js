/* jshint node:true, esnext: true */
var tedious = require('tedious');
var databaseSettings = require('../.securables/gear-config').databaseSettings;
var Connection = tedious.Connection;
var Request = tedious.Request;
var connection;

var Application = {};

Application
    .query = function (clause, cb) {
        var resJson = {
            status: 0
        };

        connection = new Connection(databaseSettings.connection);
        connection.on('connect', function (err) {
          if (err) {
            console.error(err);
            cb.call(cb, {
                status: 500,
                error: err
            });
          } else {
            console.log('Database Connected');
            resJson = _req(clause, cb);
          }
        });
    };

// private methods
function _req(clause, cb) {
    var sql = "SELECT * FROM SAODS.udfAppFullSuite2()";
    var result = [];
    var request = new Request(sql, function (err) {
        if (err) {
            cb.call(cb, {
                status: 500,
                error: err
            });
        } else {
            console.log(result);
            cb.call(cb, result);
        }
    });
    request.on('row', function(columns) {
        var obj = {};
        columns.forEach(function(column) {
            obj[column.metadata.colName] = column.value;
        });
        result.push(obj);
    });
    connection.execSql(request);
}

module.exports = Application;
