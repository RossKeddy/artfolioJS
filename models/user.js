/**
 * Created by Ross on 7/14/2018.
 */

var mongoose = require('mongoose');

// define the  schema
var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'No name entered'
    },
});

// make the class definition public as ""
//module.exports = mongoose.model('Location', locationSchema);