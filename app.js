/* eslint no-console: ["error", { allow: ["error"] }] */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const api = require('./routes/api_v0.1/index');

const app = express();

// MIDDLEWARE (These must be first)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES (always after bodyParser!)
app.use('/api/v0', api);
// STATIC (publicly-available files & folders that don't require view-engine processing)
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    console.error(err);
    res.json(err);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.json(err);
//   // res.render('error', {
//   //   message: err.message,
//   //   error: {}
//   // });
// });

module.exports = app;
