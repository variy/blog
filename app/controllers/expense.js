var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');
var _ = require('underscore');
exports.save = function(req, res){

	var cid = req.query.id;
	var opt = req.query;
	delete opt.id;
	if(cid){
		Expense.findOne({
			_id: cid
		}).then(function(user){

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
		var expense = new Expense(obj);
		expense.save(function(err, expense){
			if(err)console.log(err);
			res.json({
				err: '0',
				data: expense
			})
		})
	}
}

exports.list = function(req, res){
	
	Expense.findByUser({
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
	Expense.findOne({_id: req.query.id}).then(function(task){
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
		Expense.remove({_id: id}, function(err){
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