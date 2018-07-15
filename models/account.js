// Creates the schema for users
// Ross Keddy

var mongoose = require('mongoose');

// reference passport-local-mongoose for user authentication
var plm = require('passport-local-mongoose');

// define the user schema
var AccountSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    oauthID: String,
    created: Date
});

// used for configuring options
AccountSchema.plugin(plm);

// make it public
module.exports = mongoose.model('Account', AccountSchema);