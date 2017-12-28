var mongoose = require('mongoose');
var logSchema = require('../schmas/log');

module.exports = mongoose.model('Log', logSchema);


