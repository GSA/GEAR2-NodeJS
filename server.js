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
    models = require('./models');

    // TODO: clean this up
    const passportJWT = require("passport-jwt");
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
  // TODO: error catch??
  return cb(null, secureAuthProfile);
}));
// PASSPORT JWT STRATEGY
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromHeader('authorization'),
        secretOrKey   : process.env.SECRET
    },
    function (jwtPayload, cb) {
        // TODO: error catch
        console.log('\nPAYLOAD\n')
        return cb(null, jwtPayload);
        // //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
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
app.get('/api/beginAuth', (req, res) => {
  console.log('BEGIN AUTH');
  res.send('Hello World');
  // res.redirect(process.env.SAML_ENTRY_POINT);
});
/********************************************************************
VERIFY A JWT
********************************************************************/
app.get('/verify', function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    console.log('VER');
    res.json(req.user);
  });
  // TODO: validate exiration, structure etc. then pass along

}
);
/********************************************************************
SAML IdP RESPONSE HANDLER (CONCLUDES FIRST PASS & BEGINS THE SECOND)
********************************************************************/
app.post(samlConfig.path,
  passport.authenticate('saml'),
  (req, res) => {
    const samlProfile = req.user;

    console.log(samlProfile);

    // TODO make sure have data we need/customer wants and use the proper, semi-standard keynames
    const jwt = {
      sub: samlProfile.nameID,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // TODO <-- proper value
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
  console.log(localStorage.jwt)
  window.location.assign('/admin/#/' + path);
</script>
</body>
</html>
`
    res.send(html);

    // const db = mysql.createConnection({
    //   host: process.env.DB_HOST,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.ACL_DB,
    // });
    // db.connect();
    // db.query(`CALL acl.get_user_perms_al('${samlProfile.nameID}');`,
    //   (err, results, fields) => {
    //     if (err) {
    //       res.json({error: err});
    //     }
    //     else {
    //       res.json({success: results});
    //     }
    //
    //   }
    // );
  }
);
/********************************************************************
SAML FALL-THROUGH (CONCLUDES SECOND PASS)
********************************************************************/
/********************************************************************
Can we reduce JOINs by QUERYING if admin first?
AND USE PREPARED STATEMENTS INSTEAD?
********************************************************************/
// rm hard-coded; go back to SAML and try different users
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
        res.status = 401;
        res.json({
          status: 401,
          msg: err
        })
      } else {
        // 200 NOW ATTACH ADD'L DATA
        // TODO: IF ADMIN, JUST FLAG AS SUCH AND MOVE ON--NO NEED TO JOIN GROUPS, etc.
        const serializedRoles = JSON.parse(JSON.stringify(results[0]));

        samlProfile.scopes = [
          "poc: CREATE",
          "referenceDocument: CREATE",
          "technology: CREATE",
          "poc: UPDATE",
          "referenceDocument: UPDATE",
          "technology: UPDATE",
        ];
        samlProfile.admin = true;
        // TODO: RESTORE EXPIRES!!
        const token = jsonwebtoken.sign(samlProfile, process.env.SECRET);
        const html =
`
  <html>
  <body>
    <script>
      const path = localStorage.redirectPath;
      delete localStorage.redirectPath;
      localStorage.jwt = '${token}';
      console.log(localStorage.jwt)
      if (path) {
        window.location.replace(path);
      }
    </script>
  </body>
  </html>
`
        res.send(html);
      }
    }
  );
});
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
    resource.all.auth((req, res, context) => {
      passport.authenticate('jwt', function (unknown, jwt, error) {
        if (error) {
          res.status(401).json({});
          return context.stop();
        }
        //TODO: determine if jwt value allows me to do the thing I'm trying to do on this resource
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
