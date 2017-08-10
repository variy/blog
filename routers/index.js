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

var pageNum = 0;
var pageSize = 2;
var articleCount = '';

router.use(function(req, res, next){
	Article.count({}, function(err, c){
		articleCount = c;
		next();
	});
});
router.get('/article/query', function(req, res){
	var pageSize = req.query.ps;
	var pageNum = Number(req.query.pn || '1');

	var pageCount = Math.ceil(articleCount/pageSize);

	pageNum < 1 && (pageNum = 1);
	pageNum > pageCount && (pageNum = pageCount);

	pageSize > articleCount && (pageSize = articleCount);

	Article.find().limit(2).skip( 2 ).then(function(result){
		var data = {};
		if(result){
			data = {
				err: '0',
				data: {
					list: result,
					count: articleCount,
					pn: pageNum
				}
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