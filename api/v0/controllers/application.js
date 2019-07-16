const AppStore = require('../stores/application');
const CapStore = require('../stores/capability');
const TechStore = require('../stores/technology');
const POCStore = require('../stores/poc');
const InterfaceStore = require('../stores/interface');
const Interfacev2Store = require('../stores/interfacev2');
const AppRetiredStore = require('../stores/appretired');

const appStore = new AppStore();
const capStore = new CapStore();
const techStore = new TechStore();
const pocStore = new POCStore();
const interfaceStore = new InterfaceStore();
const interfacev2Store = new Interfacev2Store();
const appRetiredStore = new AppRetiredStore();

function findAll(req, res) {
  let fields = '*';
  let filter = '';

  if (Object.hasOwnProperty.call(req.query, 'fields')) {
      appStore.search(`call get_application_full_suite( ${filter})`, (results) => {
          res.json(results);
      });
  } else if (Object.hasOwnProperty.call(req.query, 'ownerName')) {
    filter = `'%${req.query.ownerName}%'`;
      appStore.search(`call get_application_list_view( ${filter})`, (results) => {
          res.json(results);
      });
  } else {
    filter = 0;
      appStore.search(`call get_application_list_view( ${filter})`, (results) => {
          res.json(results);
      });
  }
}

function findAllRetired ( req, res ) {
    appRetiredStore.search(`call get_application_retired_list(0)`, (results) => {
        res.json(results);
    });
}

function findOne(req, res) {
  appStore.search(`call get_application_full_suite(${req.params.id})`, (results) => {
    res.json(results);
  });
}

function findCapabilities(req, res) {
  capStore.search(`call get_capability_by_app(${req.params.id})`, (results) => {
    res.json(results);
  });
}

function findTechnologies(req, res) {
  techStore.search(`call get_technology_by_app(${req.params.id})`, (results) => {
    res.json(results);
  });
}

function findPOCs(req, res) {
  appStore.search(`call get_application_full_suite(${req.params.id})`, (results) => {
    res.json(results);
  });
}

function findInterfaces(req, res) {
  interfaceStore.search(`call get_application_interfaces( ${req.params.id} )`, (results) => {
    res.json(results);
  });
}

function findInterfacesv2(req, res) {
  interfacev2Store.search(`CALL get_application_interfacesv3( ${req.params.id} )`, (results) => {
    res.json(results);
  });
}

module.exports = {
  findCapabilities,
  findTechnologies,
  findPOCs,
  findInterfaces,
  findInterfacesv2,
  findAll,
    findAllRetired,
  findOne
};
