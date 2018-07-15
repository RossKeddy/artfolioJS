var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//
var app = express();

// connect to mongodb
var mongoose = require('mongoose');
var config = require('./config/globalVars');
mongoose.connect(config.db);

// passport configuration for authentication
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;

// enable the app to use these passport classes
app.use(flash());

// configure sessions
app.use(session( {
    secret: config.secret,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.initialize());
app.use(passport.session());

// connect passport to the Account model
var Account = require('./models/account');
passport.use(Account.createStrategy());

// manage sessions through the db
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.render('404.ejs', {
        title: 'Page Not Found'});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
console.log(" ");
console.log("******************************************************************");
console.log("     Connected - running on port 3000 ");
console.log("     v1.0 Stable Running");
console.log("     Copyright Artfolio ");
console.log("     Created by the artfolio monkeys  ");
console.log(" ");
console.log("       ##   #####  ##### ######  ####  #      #  #### ");
console.log("      #  #  #    #   #   #      #    # #      # #    #");
console.log("     #    # #    #   #   #####  #    # #      # #    #");
console.log("     ###### #####    #   #      #    # #      # #    #");
console.log("     #    # #   #    #   #      #    # #      # #    #");
console.log("     #    # #    #   #   #       ####  ###### #  #### ");
console.log(" ");
console.log("******************************************************************");
console.log(" ");

module.exports = app;