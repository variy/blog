var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userScheMa = new Schema({
	username: String,
	password: String
});

module.exports = userScheMa;