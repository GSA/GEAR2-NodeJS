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
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    session = require('express-session'),
    mysql = require('mysql2'),
    util = require('util'),
    models = require('./models');

const orm = models.sequelize;

// Define a default port if the env variable doesn't exist
const port = process.env.PORT || 3333;

// Initialize server
var app = express();
/********************************************************************
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
// these 2 serialize & deserialize user functions are a passport pattern
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
// PASSPORT SAML STRATEGY
passport.use(new SAMLStrategy(samlConfig, (secureAuthProfile, cb) => {
  const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:'acl',
  });
  //TODO: IS THIS SQL UP TO DATE?? 8/3/18
  const sqlString = `CALL acl.get_user_perms('${secureAuthProfile.nameID}');`;
  dbConn.connect();
  dbConn.query(sqlString, (err, results, fields) => {
    if (err) {
      secureAuthProfile.dbError = util.inspect(err);
      // PURPOSELY AVOIDING A LOG-IN ERROR & SENDING DB ERROR ALONG WITH PROFILE.
      return cb(null, secureAuthProfile);
    } else {
      secureAuthProfile.dbError = null;
      secureAuthProfile.groups = JSON.parse(JSON.stringify(results[0]));
      return cb(null, secureAuthProfile);
    }
  });
}));
// PASSPORT JWT STRATEGY
// TODO: do NOT got to production without securing signing key
passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
      //find the user in db if needed
      console.log('\n\nFFFAAAARRRBBL\n\n');
      return cb(null, {
        id:1,
        un:'mfagjhzf',
      })
      // return UserModel.findOneById(jwtPayload.id)
      //     .then(user => {
      //         return cb(null, user);
      //     })
      //     .catch(err => {
      //         return cb(err);
      //     });
    }
));

/********************************************************************/
// LOAD MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cross Origin Resource Sharing headers set via the cors lib & finaleMiddleware
app.use(cors());

/********************************************************************
PASSPORT & SESSION MIDDLEWARE (Introduced with Passport-SAML)
********************************************************************/
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: 'not used right now'
  }));
app.use(passport.initialize());
app.use(passport.session());

/********************************************************************
ADMIN GATEWAY
********************************************************************/
app.get('/admin', function (req, res) {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
  } else {
    res.redirect('/login')
  }
});
/********************************************************************
PUBLIC STATIC
********************************************************************/
app.use(express.static(path.join(__dirname, 'public')));

/********************************************************************
PASSPORT ROUTES
********************************************************************/
app.get('/pass', function (req, res) {
  const reqStr = util.inspect(req, false, null);
  if (req.isAuthenticated()) {
    res.redirect('/admin/#/');
  } else {
    res.status = 403
    res.send('UNAUTHORIZED');
  }
});
/********************************************************************
LOG IN
********************************************************************/
app.get('/pp', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);
app.get('/login',
  passport.authenticate('saml', {
      successRedirect: '/pass',
      failureRedirect: '/login'
    })
  );
/********************************************************************
SAML CALLBACK ROUTE. This will receive SAML assertion response
********************************************************************/
app.post(samlConfig.path,
  passport.authenticate('saml',{ successRedirect: '/pass', failureRedirect:'/pass' }),
  (req, res) => {
    res.redirect('/pass')
  }
);
/********************************************************************
LOG OUT
********************************************************************/
app.get('/logout', function (req, res) {
  req.logout();
  // TODO: invalidate session on IP
  res.redirect('/pass');
});
/********************************************************************
GET USER STATUS
********************************************************************/
app.get('/ustat', (req, res) => {
  if (req.user) {
    res.json({
      id: req.session.id,
      isLoggedIn: req.isAuthenticated(),
      groups: req.user.groups,
      user: req.user,
    });
  } else {
    res.json({
      id: req.session.id,
      isLoggedIn: req.isAuthenticated(),
    });
  }
});
/*******************************************************************/
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
