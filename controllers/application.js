/* jshint node:true */

var App = require('../models/application');

function findAll(req, res) {
    var r = App.where(null, function (results) {
        res.json(results);
    });
}

function create(req, res, next) {
}

function findOne(req, res, next) {
    App.where('[Identity]=' + req.params.id, function (results) {
        res.json(results);
    });
}

function update(req, res, next) {
}

function remove(req, res, next) {
}

module.exports = {
    findAll: findAll,
    create: create,
    findOne: findOne,
    update: update,
    remove: remove
};
