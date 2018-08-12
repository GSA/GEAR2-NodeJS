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
    jsonwebtoken = require('jsonwebtoken'),
    jwt = require('express-jwt'),
    mysql = require('mysql2'),
    util = require('util'),
    models = require('./models')
    passportJWT = require("passport-jwt");

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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
  acceptedClockSkewMs: -1,
};
// Receives SAML user data
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
// PASSPORT SAML STRATEGY
passport.use(new SAMLStrategy(samlConfig, (secureAuthProfile, cb) => {
  return cb(null, secureAuthProfile);
}));
// PASSPORT JWT STRATEGY
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey   : process.env.SECRET
    },
    function (jwtPayload, cb) {
      return cb(null, jwtPayload);
    }
));

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
app.get('/admin', passport.authenticate('saml'), function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});
/********************************************************************
(TK) PASSPORT ROUTES
********************************************************************/
app.get('/beginAuth', passport.authenticate('saml'), (req, res) => {
  // console.log('BEGIN AUTH');
  const html =
`
<html>
<body>
  <script>
    localStorage.samlEntryPoint = '${process.env.SAML_ENTRY_POINT}';
    // window.location.assign('${process.env.SAML_ENTRY_POINT}');
  </script>
</body>
</html>
`
  res.send(html);
});
/********************************************************************
(TK) VERIFY A JWT
********************************************************************/
app.get('/verify',
  (req, res, next) => {
    passport.authenticate('jwt', function (err, user, info) {
      res.json(req.user);
    });
    // TODO: validate exp, structure etc. then pass along
  }
);
/********************************************************************
SAML IdP RESPONSE HANDLER
********************************************************************/
app.post(samlConfig.path,
  passport.authenticate('saml'),
  (req, res) => {
    const samlProfile = req.user;

    let results = '';//'technologyStatus:GET,technology:GET,technology:POST,standardType:GET,deploymentType:GET,fisma:PUT';
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.ACL_DB,
    });
    db.connect();
    db.query(`CALL acl.get_user_perms('${samlProfile.nameID}');`,
      (err, results, fields) => {
        if (err) {
          res.status(500);
          res.json({error: err});
        }
        else {
          results = results;
          console.log(results)

          // TODO make sure have data we need/customer wants and use the proper, semi-standard keynames
          // TODO proper values for JWT
          const jwt = {
            sub: samlProfile.nameID,
            un: results[0][0].Username,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            scopes: results[0][0].PERMS
          };
          const token = jsonwebtoken.sign(jwt, process.env.SECRET);

          const html =
`
<html>
  <body>
    <script>
      const path = localStorage.redirectPath || '';
      delete localStorage.redirectPath;
      localStorage.jwt = '${token}';
      localStorage.samlEntryPoint = '${process.env.SAML_ENTRY_POINT}';
      window.location.assign('/admin/#/' + path);
    </script>
  </body>
</html>
`
          res.send(html);
        }
      }
    );
  }
);

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
        attributes: ['keyname']
      }]
    });
    resource.all.auth((req, res, context) => {
      // token will store 'scopes' where a 'scope' is a concatenation of resource model className
      // and HTTP verb (e.g. 'application:GET')
      passport.authenticate('jwt', function (unknown, jwt, error) {
        console.log('\nAT FINALE AUTH...');
        console.log(unknown);
        console.log('TEST: ' + modelClassName + ':' + req.method + ' in...');

        if (error) {
          console.log(error);
          res.status(401).send('UNAUTHORIZED');
          return context.stop();
        }
        if (!jwt.scopes) {
          console.log('ACCESS DENIED: !jwt.scopes');
          res.status(403).json({msg: 'ACCESS DENIED: !jwt.scopes'});
        }
        if (!jwt.scopes.split(',').includes(modelClassName + ':' + req.method)) {
          console.log('ACCESS DENIED: '  + modelClassName +':'+req.method)
          console.log(jwt.scopes.split(','));
          res.status(403).json({msg: 'ACCESS DENIED', resource: modelClassName, method: req.method});
          return context.stop();
        }
        console.log('ACCESS GRANTED: ' + modelClassName +':'+req.method);
        console.log('AUTH COMPLETE\n');
        context.continue();
      })(req, res);
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
