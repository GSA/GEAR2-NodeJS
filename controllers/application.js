/* jshint node:true */

var App = require('../stores/application');

function findAll(req, res) {
    var r = App.query(null, function (results) {
        res.json(results);
    });
}

function findOne(req, res, next) {
    App.query('[Identity]=' + req.params.id, function (results) {
        res.json(results);
    });
}

module.exports = {
    findAll: findAll,
    findOne: findOne
};
