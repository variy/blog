var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var _ = require('underscore');
exports.save = function(req, res){
	console.log(req.query)

	var cid = req.query.id;
	var opt = req.query;
	delete opt.id;
	if(cid){
		Task.findOne({
			_id: cid
		}).then(function(user){
			console.log(user)

			if(user){
				user.update(opt, function(err, raw){
					if(err)console.log(err)
					res.json({
						err: '0',
						data: {
							raw: raw
						}
					})
				})
			}else{
				res.json({
					err: '404',
					data: user
				})
			}
		});
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
		var newList = list.map(function(item){
			delete item.meta;
			return item;
		});
		console.log(JSON.stringify(newList))
		res.json({
			err: '0',
			data: newList
		})
	})
}

exports.queryitem = function(req, res){
	var opt = req.query;
	var id = opt.id;
	delete opt.id;
	Task.findOne({id: req.query.id}).then(function(user){
		if(user){
			res.json({
				err: '0',
				data: user
			});
		}else{
			res.json({
				err: '400',
				msg: '没有此任务'
			})
		}
	});
}