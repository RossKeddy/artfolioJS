var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'artfolio' });
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'artfolio' });
});

/* GET Register page. */
router.get('/signIn', function(req, res, next) {
    res.render('signIn', { title: 'artfolio' });
});

module.exports = router;
