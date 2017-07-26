var mongoose = require('mongoose');

var Schma = mongoose.Schma;

var userScheMa = new Schma({
	name: String,
	password: String
});

exports.user = userScheMa;