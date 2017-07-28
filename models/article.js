var mongoose = require('mongoose');
var articleSchema = require('../schmas/article');

module.exports = mongoose.model('Article', articleSchema);


