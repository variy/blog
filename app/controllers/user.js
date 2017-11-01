var mongoose = require('mongoose');
var User = mongoose.model('User');
exports.checkLogin = function(req, res){
	var isLogin = 'userInfo' in req.session;
	var userInfo = req.session.userInfo;
	var username = isLogin ? req.session.userInfo.username : ''
	res.json({
		err: '0',
		data: {
			isLogin: isLogin,
			username: username,
			isAdmin: isLogin && userInfo.role > 10

		}
	})
};

exports.login = function(req, res) {
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
					tokenId  : 'abcdefg',
					isAdmin: userInfo.role > 10
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
};

exports.logout = function(req, res){
	delete req.session.userInfo;
	res.json({
		err: '0',
		data: {
			
		}
	})
};

exports.register = function(req, res) {

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
};
exports.list = function(req, res){
	User.find({}).then(function(list){
		res.json({
			err: '0',
			data: {
				list: list
			}
		})
	})
}
// middleware
exports.signinRequired = function(req, res, next) {
	var user = req.session.userInfo;

	if (!user) {
		return res.json({
			err: '998',
			msg: '尚未登录'
		})
	}
	next()
};

exports.adminRequire = function(req, res, next) {
	var user = req.session.userInfo;

	if (user.role <= 10) {
		return res.json({
			err: '997',
			msg: '用户权限不足'
		})
	}

	next()
};
