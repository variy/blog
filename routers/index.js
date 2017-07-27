var express = require('express');
var router = express.Router();

var User = require('../models/user.js')

router.post('/user/login', function(req, res){
	console.log(req.body);

	var username = req.body.username;
	var password = req.body.password;
	var result = {};
	console.log(username)
	User.findOne({
		username: username
	}).then(function(userInfo){
		if(userInfo){
			result = {
				err: '0'
			}
		}else{
			result = {
				err: '-1',
				msg: '用户名或密码错误'
			}
		}

		res.json(result);
	});
});

module.exports = router;