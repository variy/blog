var mongoose = require('mongoose');
var Schema = require('../schmas/expense');

module.exports = mongoose.model('Expense', Schema);

