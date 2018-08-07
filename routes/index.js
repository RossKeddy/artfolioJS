var fs = require('fs');

var express = require('express');
var router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });

// Account model
var Artist = require('../models/account');
var passport = require('passport');

//
var btoa = require('btoa');

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
            lastname: req.body.lastname,
            profession: req.body.profession,
            country: req.body.country,
            provinceState: req.body.provinceState,
            city: req.body.city
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
    successRedirect: '/artist',
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
    var images = req.user.images.map(function(image) {
        image.data = btoa(image.data);
        return image;
    });

    res.render('artist', {
        title: 'artfolio',
        user: req.user,
        images,
    });
});

/* GET search page. */

router.get('/search', function(req, res, next) {
    // use the Drink model to query the db for drink data
    Artist.find(function(err, artists) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the drinks page and pass the query result
            res.render('search', {
                title: 'All the Booze That\'s Fit to Drink',
                artists : artists
            });
        }
    });
});


/*TEST ROUTE*/
router.get('/test', function(req, res, next) {
    console.log(req.user.images);
});

/* GET Upload */
router.get('/upload', function(req, res, next) {
    res.render('upload', {
        title: 'upload',
        user: req.user
    });
});

router.post('/upload', upload.single('Upload'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);

    var fileData = fs.readFileSync(req.file.path);
    var image = {contentType: 'image/png', data: fileData};
    //Account.findOneAndUpdate({username: req.user.username}, {$push: {images: image }});

    Account.update(
        { username: req.user.username },
        { $push: { images: image } },
        function(error, result) {
            if (error) {
                console.error(error);
            }
            console.log(result);
        }
    );

    res.send('message');
    res.end();
})

module.exports = router;
