var mongoose = require('mongoose');
var Schema = require('../schmas/funds');

module.exports = mongoose.model('Funds', Schema);

