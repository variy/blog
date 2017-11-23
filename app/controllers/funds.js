var mongoose = require('mongoose');
var Funds = mongoose.model('Funds');
var moment = require('moment');
var _ = require('underscore');
exports.save = function(req, res){

	var cid = req.query.id;
	var opt = req.query;
	delete opt.id;
	if(cid){
		Funds.findOne({
			_id: cid
		}).then(function(item){

			if(item){
				item.update(opt, function(err, raw){
					if(err)console.log(err)
					res.json({
						err: '0',
						msg: 'update success',
						data: {
							raw: raw
						}
					})
				})
			}else{
				res.json({
					err: '404',
					data: item
				})
			}
		});
	}else{
		var obj = _.extend(req.query, {
			from: req.session.userInfo._id
		})
		var funds = new Funds(obj);
		funds.save(function(err, item){
			if(err)console.log(err);
			res.json({
				err: '0',
				msg: 'add a new funds',
				data: item
			})
		})
	}
}

exports.list = function(req, res){
	
	Funds.findValid({
		id: req.session.userInfo._id
	}, function(list) {
		var list = list.map(function(item){
			item.createdDate = moment(item.createdDate).format('YYYY-MM-DD');
			return item
		})
		res.json({
			err: '0',
			data: list
		})
	})
}

exports.queryitem = function(req, res){
	Funds.findOne({_id: req.query.id}).then(function(funds){
		if(funds){
			res.json({
				err: '0',
				data: funds
			});
		}else{
			res.json({
				err: '400',
				msg: '没有此资金记录'
			})
		}
	});
}

exports.delItem = function(req, res){
	var id = req.body.id;
	if(id){
		Funds.remove({_id: id}, function(err){
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