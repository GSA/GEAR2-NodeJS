var Sequelize = require('sequelize'),
    finale = require('finale-rest'),
    finaleMiddleware = require('./finale-middleware'),
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// Define your models
var database = new Sequelize('finale_demo', 'root', null, { dialect: 'mysql' });

var objFismaartifact = database.import(`${__dirname}/models/obj_fismaartifact`);
var objFisma = database.import(`${__dirname}/models/obj_fisma`);

// ASSOCIATIONS
objFisma.belongsToMany(objFismaartifact, { through: 'j_fisma_artifacts' });
objFismaartifact.belongsToMany(objFisma, { through: 'j_fisma_artifacts' });

// Initialize server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
var server = http.createServer(app);

// Initialize finale
finale.initialize({
  app: app,
  sequelize: database
});

// Create REST resource
var fismaResource = finale.resource({
  model: objFisma,
  endpoints: ['/fisma', '/fisma/:id']
});
fismaResource.use(finaleMiddleware);

var fismaartResource = finale.resource({
  model: objFismaartifact,
  endpoints: ['/artifacts', '/artifacts/:id']
});

// Create database and listen
database
  .sync()
  .then(function() {
    server.listen(3333, 'localhost', () => {
      console.info('Express listening on port', server.address().port);
    });
  });
