var express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var cors = require('cors');

var db = require('./config/db');

var indexRouter = require('./app/routes/index')
var contactRouter = require('./app/routes/contacts');
var projectRouter = require('./app/routes/projects');
var serviceRouter = require('./app/routes/services');
var userRouter = require('./app/routes/users');


var app = express();

db(); // Connect to the DB.

app.use(cors()); // CORS for all clients
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(logger('dev')); // Log in the terminal

// Set up the routers
app.use('/', indexRouter)
app.use('/api/contacts', contactRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error json
  res.status(err.status || 500);
  res.json(
    {
      success: false,
      message: err.message
    }
  );
});

// Initialize the server
var port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server running at http://localhost:${port}/`);