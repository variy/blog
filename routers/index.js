var express = require('express');
var router = express.Router();

var User = require('../models/user.js')

router.post('/user/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	const msg = '';
	
	User.remove({
		username: '123'
	}, function(err, userInfo){
		if(err){
			console.log(err);
		}

		res.json(userInfo);
	});

	User.find({
		username: '123'
	}).exec(function(userInfo){
		if(err){
			console.log(err);
		}

		res.json(userInfo);
	});
	// promise.then(function(userInfo){
	// 	console.log('arguments');
	// }, function(err){
	// 	console.log(err);
	// });
	
	// .then(function(userInfo){
	// 	if(userInfo){
	// 		console.log('不存在这个用户')
	// 	}else{
	// 		console.log('存在这个用户')
	// 	}
	// })
});

module.exports = router;