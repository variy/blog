var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userScheMa = new Schema({
	username: String,
	password: String,
	role: {
		type: Number,
		default: 0
	}

});

module.exports = userScheMa;