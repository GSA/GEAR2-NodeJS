var
    dotenv = require('dotenv').config(),
    finale = require('finale-rest'),
    finaleMiddleware = require('./api/v1/finale-middleware'),
    finaleVar = require('./api/v1/finale-var'),
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
    models = require('./api/v1/models'),
    passportJWT = require("passport-jwt"),
    // Legacy API
    api_v0 = require('./api/v0/routes/api_v0.1/index');

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
LEGACY API
********************************************************************/
app.use('/api/v0', api_v0);
/********************************************************************
ADMIN GATEWAY
********************************************************************/
app.get('/admin', passport.authenticate('saml'), function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});
/********************************************************************
REDIRECT ROOT TO GEAR "read only" (aka "legacy"; aka "angular") app
********************************************************************/
app.get('/', function (req, res) {
  // res.redirect('/gear/')
  res.sendFile(path.join(__dirname, 'public', 'gear', 'index.html'));
});
/********************************************************************
PASSPORT ROUTES
********************************************************************/

/********************************************************************
1. AUTH ENTRY POINT (STARTS WITH A SAML ASSERTION)
********************************************************************/
app.get('/beginAuth', passport.authenticate('saml'), (req, res) => {
  // TODO: is this saml-protected route still necessary? or can we
  // change the client src to use /admin (no-hash) instead? Perhaps
  // it's needed while running the React app in dev b/c its proxy.
  const html =
`
<html>
<body>
  <script>
    localStorage.samlEntryPoint = '${process.env.SAML_ENTRY_POINT}';
  </script>
</body>
</html>
`
  res.send(html);
});
/********************************************************************
2. JWT ENTRY POINT & VERIFICATION (depends on SAML for user ID)
TODO: is this actually used by the admin app? or is it a dev tool?
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
3. SAML IDENTITY PROVIDER (IdP) POST-BACK HANDLER (USES INLINE HTML)
********************************************************************/
app.post(samlConfig.path,
  passport.authenticate('saml'),
  (req, res) => {

    const samlProfile = req.user;
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
          let html = ``;
          let userLookupStatus = ``;
          if (results[0].length === 0) {
            userLookupStatus = `Unable to verify user, <strong>${samlProfile.nameID}</strong><br/><a href="${process.env.SAML_ENTRY_POINT}">TRY AGAIN</a>`;
            html = `<html><body style="font-family:sans-serif;"><p>${userLookupStatus}</p></body></html>`;
            res.status(401);
            res.send(html);
            return false;
          }

          // TODO: (1) DECIDE IF PAYLOAD IS TOO LARGE. (2) IF SO, ADD LOGIC TO QUERY PERMS AS NEEDED
          const jwt = {
            sub: samlProfile.nameID,
            un: results[0][0].Username,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            scopes: results[0][0].PERMS
          };

          // JWT TOKEN SIGNED HERE TO BE USED IN INLINE HTML PAGE NEXT
          const token = jsonwebtoken.sign(jwt, process.env.SECRET);

          html =
`
<html>
  <body>
    <em>Redirecting to GEAR Manager...</em>
    <script>
      const path = localStorage.redirectPath || '';
      delete localStorage.redirectPath;
      localStorage.jwt = '${token}';
      localStorage.samlEntryPoint = '${process.env.SAML_ENTRY_POINT}';
      window.location.replace('/admin/#/' + path);
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

  const resource = finale.resource({
    model: modelInstance,
    endpoints: [`/${modelRefName.plural}`, `/${modelRefName.plural}/:id`],
    pagination: true, 
    search: [{
      param: 'kn',
      attributes: ['keyname']
    }]
  });
  resource.use(finaleMiddleware);
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
