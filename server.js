var Sequelize = require('sequelize'),
    finale = require('finale-rest'),
    finaleMiddleware = require('./finale-middleware'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    models = require('./models');

// // Initialize server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

// Initialize finale
finale.initialize({
  app: app,
  sequelize: models.sequelize,
});

// Create REST resource
var fismaResource = finale.resource({
  model: models.Fisma,
  endpoints: ['/fisma', '/fisma/:id'],
  pagination: true,
  // associations: true,
});
fismaResource.use(finaleMiddleware);

var fismaartResource = finale.resource({
  model: models.Artifact,
  endpoints: ['/artifacts', '/artifacts/:id'],
  pagination: true,
  // associations: true,
});
fismaartResource.use(finaleMiddleware);

var pocResource = finale.resource({
  model: models.Poc,
  endpoints: ['/pocs', '/pocs/:id'],
  pagination: true,
  // associations: true,
});
pocResource.use(finaleMiddleware);

var fscloudstResource = finale.resource({
  model: models.FSCloudST,
  endpoints: ['/fscloudsts', '/fscloudsts/:id'],
  pagination: true,
  // associations: true,
});
fscloudstResource.use(finaleMiddleware);

// Create database and listen
models.sequelize.sync().then(function() {
  server.listen(3333, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
