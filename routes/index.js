var express = require('express');
var router = express.Router();

// Account model
var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'artfolio',
      user: req.user
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Register',
        user: req.user
    });
});

/* POST register page */
router.post('/register', function(req, res, next) {
    //save the new user
    Account.register(new Account( {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }),
        req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                res.render('/register');
            }
            else {
                res.redirect('/login');
            }
        });
});

/* GET login page */
router.get('/login', function(req, res, next) {

    // get session messages
    var messages = req.session.messages || [];

    res.render('login', {
        title: 'Login',
        messages: messages,
        user: req.user
    });

    // clear the messages out of the session
    req.session.messages = null;
});

/* POST login page */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'  // stored in session.messages
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/login');
});

/* GET artist page. */
router.get('/artist', function(req, res, next) {
    res.render('artist', {
        title: 'artfolio'
    });
});

module.exports = router;
