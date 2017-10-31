var mongoose = require('mongoose');
var Task = mongoose.model('Task');

exports.save = function(req, res){
	var _task = req.body.task;
	var cid = req.body.cid;

	if(cid){
		res.json({
			err: '-1',
			msg: '这是编辑'
		})
	}else{
		var task = new Task(_task);
		task.save(function(err, task){
			if(err)console.log(err);
			res.json({
				err: '0',
				data: task
			})
		})
	}
}