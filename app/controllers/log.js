var mongoose = require('mongoose');
var Log = mongoose.model('Log');
var _ = require('underscore');
exports.save = function(req, res){

	var cid = req.query.id;
	var opt = req.query;
	delete opt.id;
	if(cid){
		Log.findOne({
			_id: cid
		}).then(function(logObj){

			if(logObj){
				logObj.update(opt, function(err, raw){
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
					data: logObj
				})
			}
		});
	}else{
		var obj = _.extend(req.query, {
			from: req.session.userInfo._id
		})
		var log = new Log(obj);
		log.save(function(err, log){
			if(err)console.log(err);
			res.json({
				err: '0',
				data: log
			})
		})
	}
}

exports.list = function(req, res){
	var opts = {
		id: req.session.userInfo._id
	}

	if('from' in req.query){
		opts.date = {
			'$gte': new Date(req.query.from),
			'$lt': new Date(req.query.to)
		};
	}
	Log.findByUser(opts, function(list) {
		console.log(arguments);
		var newList = list.map(function(item) {
			delete item.meta;
			return item;
		});
		res.json({
			err: '0',
			data: newList
		})
	})
}

exports.queryitem = function(req, res){
	Log.findOne({_id: req.query.id}).then(function(task){
		if(task){
			res.json({
				err: '0',
				data: task
			});
		}else{
			res.json({
				err: '400',
				msg: '没有此任务'
			})
		}
	});
}

exports.delItem = function(req, res){
	var id = req.body.id;
	if(id){
		Log.remove({_id: id}, function(err){
			if(err)console.log(err);
			res.json({
				err: '0'
			})
		});
	}else{
		res.json({
			err: '400'
		})
	}
		
}