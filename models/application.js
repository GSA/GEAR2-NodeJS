/* jshint node:true, esnext: true */
var tedious = require('tedious');
var databaseSettings = require('../.securables/gear-config').databaseSettings;
var Connection = tedious.Connection;
var Request = tedious.Request;
var connection;

var Application = {};

Application
    .where = function (clause, cb) {
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
            resJson = findAll(cb);
          }
        });
    };

// private methods
function findAll (cb) {
    var sql =   'SELECT TOP 50 * ' +
                'FROM [' + databaseSettings.connection.options.database + '].[SAODS].[Def_Application];';
    var result = [];
    var request = new Request(sql, function (err) {
        if (err) {
            cb.call(cb, {
                status: 500,
                error: err
            });
        } else {
            console.log(result);
            cb.call(cb, {
                status: 200,
                items: result
            });
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
