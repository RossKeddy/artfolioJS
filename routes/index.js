var express = require('express');
var router = express.Router();

// Account model
var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'artfolio'
  });
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Register'
    });
});

/* POST register page */
router.post('/register', function(req, res, next) {
    //save the new user
    Account.register(new Account( {
            email: req.body.email,
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

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login'
    });
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

module.exports = router;
