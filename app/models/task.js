var mongoose = require('mongoose');
var TaskSchema = require('../schmas/task');

module.exports = mongoose.model('Task', TaskSchema);

