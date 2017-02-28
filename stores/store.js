/* jshint node:true, esnext: true */
var tedious = require('tedious');
var databaseSettings = require('../.securables/gear-config').databaseSettings;
var _ = require('underscore');
var Connection = tedious.Connection;
var Request = tedious.Request;

function Store() {
    this.model = null;
    this.data = [];
};

Store.prototype.query = function (sql, cb) {
    var connection = new Connection(databaseSettings.connection);
    connection.on('connect', function (err) {
      if (err) {
        console.error(err);
        cb.call(cb, {
            status: 500,
            error: err
        });
      } else {
        console.log('Database Connected');
        var result = [];
        var request = new Request(sql, function (err) {
            if (err) {
                cb.call(cb, {
                    status: 500,
                    error: err
                });
            } else {
                cb.call(cb, result);
            }
        }.bind(this));

        console.log('MY MODEL IS: ', this.model);

        request.on('row', function(columns) {
            var obj = {};
            columns.forEach(function(column) {
                obj[column.metadata.colName] = column.value;
            });
            result.push(this.model.apply(obj));
        }.bind(this));
        connection.execSql(request);
      }
  }.bind(this));
}

module.exports = Store;
