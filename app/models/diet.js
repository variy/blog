var mongoose = require('mongoose');
var Schema = require('../schmas/diet');

module.exports = mongoose.model('Diet', Schema);

