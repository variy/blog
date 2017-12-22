var mongoose = require('mongoose');
var Diet = mongoose.model('Diet');
var _ = require('underscore');
exports.save = function(req, res){

	var cid = req.query.id;
	var opt = req.query;
	delete opt.id;
	if(cid){
		Diet.findOne({
			_id: cid
		}).then(function(dietObj){

			if(dietObj){
				dietObj.update(opt, function(err, raw){
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
					data: dietObj
				})
			}
		});
	}else{
		var obj = _.extend(req.query, {
			from: req.session.userInfo._id
		})
		var diet = new Diet(obj);
		diet.save(function(err, diet){
			if(err)console.log(err);
			res.json({
				err: '0',
				data: diet
			})
		})
	}
}

exports.list = function(req, res){
	
	Diet.findByUser({
		id: req.session.userInfo._id,
		date: {
			'$gte': new Date(req.query.from),
			'$lt': new Date(req.query.to)
		}
	}, function(list) {
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
	Diet.findOne({_id: req.query.id}).then(function(task){
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
		Diet.remove({_id: id}, function(err){
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