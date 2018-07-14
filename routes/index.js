var express = require('express');
var router = express.Router();

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

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

/* GET artist page. */
router.get('/artist', function(req, res, next) {
    res.render('artist', {
        title: 'Artist'
    });
});

module.exports = router;
