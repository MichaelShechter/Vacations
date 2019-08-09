var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 
const cors = require('cors');
// const mongoose = require('mongoose');
// const config =  require('config');
const connectDB  = require('./config/db');
var vactionRouter = require('./routes/vacations');
var usersRouter = require('./routes/users');




//Connect to DB
connectDB();


//Define Routes
const cookieSession = require('cookie-session');
var app = express();
app.use(logger('dev'));
app.use(cors());
app.use(cookieSession({secret:'ninja'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Define Routes
app.use('/api/vacations', vactionRouter);
app.use('/api/users', usersRouter);


//Server static assets in prod
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}



// catch 404 and forward to error handler!
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});
module.exports = app;
