var
    dotenv = require('dotenv').config(),
    finale = require('finale-rest'),
    finaleMiddleware = require('./finale-middleware'),
    finaleVar = require('./finale-var'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    SAMLStrategy = require('passport-saml').Strategy,
    jwt = require('express-jwt'),
    mysql = require('mysql2'),
    util = require('util'),
    models = require('./models');

const orm = models.sequelize;

// Define a default port if the env variable doesn't exist
const port = process.env.PORT || 3333;

// Initialize server
var app = express();

/********************************************************************
PASSPORT BEGIN
 TODO: MOVE PASSPORT STUFF TO ITS OWN FILE
********************************************************************/
const samlConfig = {
  protocol: process.env.SAML_PROTOCOL,
  host: process.env.SAML_HOST,
  port: process.env.SAML_PORT,
  path: process.env.SAML_PATH,
  entryPoint: process.env.SAML_ENTRY_POINT,
  issuer: process.env.SAML_ISSUER,
};
// Receives SAML user data
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  user.resources = 'ALL';
  done(null, user);
});
// PASSPORT SAML STRATEGY
passport.use(new SAMLStrategy(samlConfig, (secureAuthProfile, cb) => {
  return cb(null, secureAuthProfile);
}));
/********************************************************************/

// LOAD EXPRESS MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cross Origin Resource Sharing headers set via the cors lib & finaleMiddleware
app.use(cors());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

/********************************************************************
ADMIN GATEWAY
********************************************************************/
app.get('/admin', function (req, res, next) {
  // TODO: determine if this needs to be wrapped in an auth conditional
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});
/********************************************************************
PASSPORT ROUTES
********************************************************************/
/********************************************************************
REQUEST A JWT
********************************************************************/
app.get('/authenticate',
  passport.authenticate('saml', {
    successRedirect: '/pass',
    failureRedirect: '/authenticate'
  })
);
/********************************************************************
SAML IdP RESPONSE HANDLER (CONCLUDES FIRST PASS & BEGINS THE SECOND)
********************************************************************/
app.post(samlConfig.path,
  passport.authenticate('saml', {
    successRedirect: '/pass',
    failureRedirect:'/pass'
  })
);
/********************************************************************
SAML FALL-THROUGH (CONCLUDES SECOND PASS)
********************************************************************/
/********************************************************************
BIG DB TODO!!! VERY IMPORTANT! reduce JOINs by QUERYING if admin first
AND USE PREPARED STATEMENTS INSTEAD
********************************************************************/
app.get('/pass', (req, res, next) => {
  // TODO: GET USER NAME DYNAMICALLY
  const samlProfile = { nameId: 'matthew.dodson@gsa.gov' };

  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.ACL_DB,
  });
  db.connect();
  db.query(`CALL acl.get_user_perms('${samlProfile.nameId}');`,
    (err, results, fields) => {
      if (err) {
        // 401 UNABLE TO FIND USER
      } else {
        // 200 NOW ATTACH ADD'L DATA
        // TODO: IF ADMIN, JUST FLAG AS SUCH AND MOVE ON--NO NEED TO JOIN GROUPS, etc.
        samlProfile.roles =  JSON.parse(JSON.stringify(results[0]));
        const token = jwt.sign(samlProfile, process.env.SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.set('authorization', 'BEARER ' + token);
        res.json({
          status: 'okay',
          user: samlProfile,
          userToken: token,
        });
      }
    }
  );
  db.close();
});
/********************************************************************
GET USER TOKEN (again?? can't we use GET /authenticate)
********************************************************************/
app.get('/me', (req, res, next) => {
});

/********************************************************************
GET USER STATUS <-- legacy endpoint. replaced by GET /authenticate
********************************************************************/
// app.get('/ustat', (req, res) => {
//   if (req.user) {
//     res.json({
//       id: req.user.id,
//       isLoggedIn: req.isAuthenticated(),
//       groups: req.user.groups,
//       user: req.user,
//     });
//   } else {
//     res.json({
//       user: req.user || 'null',
//       isLoggedIn: req.isAuthenticated(),
//     });
//   }
// });
/********************************************************************
LOG OUT (needs to expire JWT with 0 min)
********************************************************************/
// app.get('/logout', function (req, res) {
//   req.logout();
//   // TODO: invalidate JWT
//   res.redirect('/');
// });
/*******************************************************************/
//  DONE WITH PASSPORT
/*******************************************************************/
var server = http.createServer(app);

// Initialize finale
finale.initialize({
  app: app,
  base: '/api/v1',
  sequelize: orm,
});

// Create default REST resources from orm.models
// (`orm.models` are sequelize instances where local `models` are static)
Object.entries(orm.models).forEach((m) => {
  const modelClassName = m[0];
  const modelInstance = m[1];
  const modelRefName = m[1].options.name; // { singular, plural }

  // Makes sure the current model instance (orm.models) originates from the models/ directory so we
  // can exclude any that are automatically created by the ORM like join tables
  if (models[modelClassName]) {
    const resource = finale.resource({
      model: modelInstance,
      endpoints: [`/${modelRefName.plural}`, `/${modelRefName.plural}/:id`],
      pagination: true,
      include: finaleVar.getModelIncludes(modelClassName),
      search: [{
        param: 'kn',
        operator: '$like',
        attributes: ['keyname']
      }]
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
