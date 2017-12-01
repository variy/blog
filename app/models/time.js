var mongoose = require('mongoose');
var Schema = require('../schmas/time');

module.exports = mongoose.model('Time', Schema);

