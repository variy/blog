var express = require('express');
var router = express.Router();

var User = require('../models/user.js')
var Article = require('../models/article.js')


router.post('/user/login', function(req, res) {
	console.log(req.body);

	var username = req.body.username;
	var password = req.body.password;
	var result = {};
	console.log(username)
	User.findOne({
		username: username
	}).then(function(userInfo) {
		if (userInfo) {
			result = {
				err: '0'
			}
		} else {
			result = {
				err: '-1',
				msg: '用户名或密码错误'
			}
		}

		res.json(result);
	});
});

router.post('/user/register', function(req, res) {
	console.log(req.body);

	var username = req.body.username;
	var password = req.body.password;
	var result = {};
	console.log(username)
	User.findOne({
		username: username
	}).then(function(userInfo) {
		if (userInfo) {
			res.json({
				err: '-1',
				msg: '该用户名已注册'
			});

		} else {
			var user = new User({
				username: username,
				password: password
			});
			user.save().then(function() {
				res.json({
					err: '0',
					msg: '注册成功'
				})
			})

		}

	});
});

router.get('/article/query', function(req, res){
	Article.find().then(function(result){
		var data = {};
		if(result){
			data = {
				err: '0',
				data: result
			}
		}else{
			data = {
				err: '0',
				data: []
			}
		}

		res.json(data);
	});

});

module.exports = router;