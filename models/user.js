/**
 * Created by Ross on 7/14/2018.
 */

var mongoose = require('mongoose');

// define the  schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'No email entered'
    },
    firstname: {
        type: String,
        required: 'No first name entered'
    },
    lastname: {
        type: String,
        required: 'No last name entered'
    }
});

// make the class definition public as "Location"
module.exports = mongoose.model('User', userSchema);