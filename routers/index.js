var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
var Article = require('../models/article.js')


router.use(function(req, res, next){
	console.log('tokenId>>>'+req.cookies)
    if(req.session.userInfo){
        User.findOne({
        	username: req.session.userInfo.username
        }).then(function(userInfo){
        	if(!userInfo){
        		delete req.session.userInfo
        	}else{
        		console.log('已登陆' + JSON.stringify(userInfo))
        	}
        	next();
        })
    }else{

    	next();
    }
});

router.get('/user/checklogin', function(req, res){
	var isLogin = 'userInfo' in req.session;
	var username = isLogin ? req.session.userInfo.username : ''
	res.json({
		err: '0',
		data: {
			isLogin: isLogin,
			username: username
		}
	})
});

router.get('/user/login', function(req, res) {

	var username = req.query.username;
	var password = req.query.password;
	var result = {};
	User.findOne({
		username: username
	}).then(function(userInfo) {
		if (userInfo) {
			req.session.userInfo = userInfo;
			result = {
				err: '0',
				data: {
					tokenId  : 'abcdefg'
				}
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

	var username = req.body.username;
	var password = req.body.password;
	var result = {};
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

router.get('/user/listquery', function(req, res){
	User.find().then(function(result){
		var data = {};
		if(result){
			data = {
				err: '0',
				data: {
					list: result
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
router.get('/article/listquery', function(req, res){
	var pageSize = Number(req.query.ps || '2');
	var pageNum =  Number(req.query.pn || '1');
	console.log('ps=>' + pageSize +', pn=>' + pageNum);
	var pageCount = Math.ceil(articleCount/pageSize);

	pageNum < 1 && (pageNum = 1);
	pageNum > pageCount && (pageNum = pageCount);

	pageSize > articleCount && (pageSize = articleCount);

	Article.find().limit(pageSize).skip( (pageNum-1)*pageSize ).then(function(result){
		var data = {};
		if(result){
			data = {
				err: '0',
				data: {
					list: result,
					count: articleCount,
					pn: pageNum,
					pc: pageCount
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

router.get('/article/query', function(req, res){
	var id = req.query.id;
	Article.findOne({
		_id: id
	}).then(function(result){
		if(result){
			res.json({
				err: '0',
				data: result
			})
		}else{
			res.json({
				err: '-1',
				msg: '未找到该文章'
			})
		}
	})
});

module.exports = router;