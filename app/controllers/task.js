var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var _ = require('underscore');
exports.save = function(req, res){
	var cid = req.query.cid;

	if(cid){
		res.json({
			err: '-1',
			msg: '这是编辑'
		})
	}else{
		var obj = _.extend(req.query, {
			from: req.session.userInfo._id
		})
		var task = new Task(obj);
		task.save(function(err, task){
			if(err)console.log(err);
			res.json({
				err: '0',
				data: task
			})
		})
	}
}

exports.list = function(req, res){
	Task.findByUser(req.session.userInfo._id, function(list){
		res.json({
			err: '0',
			data: list
		})
	})
}