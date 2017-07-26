var mongoose = require('mongoose');
var userSchema = require('../schmas/user');

module.exports = mongoose.model('User', userSchema);

