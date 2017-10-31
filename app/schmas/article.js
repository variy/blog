var mongoose = require('mongoose');

var ArticleScheMa = new mongoose.Schema({
	title: String,
	tagList: Array,
	introduce: String,
	content: String,
	reviewCount: Number
});

module.exports = ArticleScheMa;