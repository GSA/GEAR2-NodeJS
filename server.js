var
    dotenv = require('dotenv').config(),
    finale = require('finale-rest'),
    finaleMiddleware = require('./finale-middleware'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    models = require('./models'),
    orm = models.sequelize;

// Define a default port if the env variable doesn't exist
const port = process.env.PORT || 3333;

// Initialize server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cross Origin Resource Sharing headers set via the cors lib & finaleMiddleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

var server = http.createServer(app);

// Initialize finale
finale.initialize({
  app: app,
  base: '/api/v1',
  sequelize: orm,
});

// Create REST resources
Object.entries(orm.models).forEach((m) => {
  const name = m[0];
  const endpoint = name.replace(/^obj/, '');

  // Makes sure the current model instance (orm.models) originates from the models/ directory so we
  // can exclude any that are automatically created by the ORM like join tables
  if (models[name]) {
    const resource = finale.resource({
      model: models[name],
      endpoints: [`/${endpoint}`, `/${endpoint}/:id`],
      pagination: true,
      associations: true,
    });
    resource.use(finaleMiddleware);
  }
});

// Create database and listen
orm.sync().then(function() {
  server.listen(process.env.PORT, function() {
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
