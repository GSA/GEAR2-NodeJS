/* jshint node:true */

var Store = require('../stores/store');
var AppModel = require('../models/application');
var CapModel = require('../models/capability');
var TechModel = require('../models/technology');

var appModel = new AppModel();
var appStore = new Store();
var capModel = new CapModel();
var capStore = new Store();
var techModel = new TechModel();
var techStore = new Store();

function findAll(req, res) {
    appStore.model = appModel;
    appStore.query('SELECT * FROM SAODS.udfAppFullSuite2(default)', function (results) {
        res.json(results);
    });
}

function findOne(req, res, next) {
    console.log(appStore.model);
    appStore.model = appModel;
    appStore.query("SELECT * FROM SAODS.udfAppFullSuite2(" + req.params.id + ")", function (results) {
        res.json(results);
    });
}

function findCapabilities(req, res, next) {
    capStore.model = capModel;
    capStore.query("SELECT * FROM SAODS.udfGetCapByApp(" + req.params.id + ")", function (results) {
        res.json(results);
    });
}

function findTechnologies(req, res, next) {
    techStore.model = techModel;
    techStore.query("SELECT * FROM SAODS.udfGetTechByApp(" + req.params.id + ")", function (results) {
        res.json(results);
    });
}

module.exports = {
    findAll: findAll,
    findOne: findOne,
    findCapabilities: findCapabilities,
    findTechnologies: findTechnologies
};
