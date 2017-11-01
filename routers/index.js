var express = require('express');
var router = express.Router();
var User = require('../app/controllers/user.js')
var Task = require('../app/controllers/task.js')

// var Article = require('../models/article.js')

router.get('/user/checklogin', User.checkLogin);

router.get('/user/logout', User.logout);

router.get('/user/login', User.login);

router.post('/user/register', User.register);

router.get('/user/listquery', User.signinRequired, User.adminRequire, User.list);

router.get('/task/saveitem', User.signinRequired, Task.save);

router.get('/task/query', User.signinRequired, Task.list);
 

// var pageNum = 0;
// var pageSize = 2;
// var articleCount = '';

// router.use(function(req, res, next){
// 	Article.count({}, function(err, c){
// 		articleCount = c;
// 		next();
// 	});
// });

// router.get('/user/listquery', function(req, res){
// 	User.find().then(function(result){
// 		var data = {};
// 		if(result){
// 			data = {
// 				err: '0',
// 				data: {
// 					list: result
// 				}
// 			}
// 		}else{
// 			data = {
// 				err: '0',
// 				data: []
// 			}
// 		}

// 		res.json(data);
// 	});
// });
// router.get('/article/listquery', function(req, res){
// 	var pageSize = Number(req.query.ps || '2');
// 	var pageNum =  Number(req.query.pn || '1');
// 	console.log('ps=>' + pageSize +', pn=>' + pageNum);
// 	var pageCount = Math.ceil(articleCount/pageSize);

// 	pageNum < 1 && (pageNum = 1);
// 	pageNum > pageCount && (pageNum = pageCount);

// 	pageSize > articleCount && (pageSize = articleCount);

// 	Article.find().limit(pageSize).skip( (pageNum-1)*pageSize ).then(function(result){
// 		var data = {};
// 		if(result){
// 			data = {
// 				err: '0',
// 				data: {
// 					list: result,
// 					count: articleCount,
// 					pn: pageNum,
// 					pc: pageCount
// 				}
// 			}
// 		}else{
// 			data = {
// 				err: '0',
// 				data: []
// 			}
// 		}

// 		res.json(data);
// 	});

// });

// router.get('/article/query', function(req, res){
// 	var id = req.query.id;
// 	Article.findOne({
// 		_id: id
// 	}).then(function(result){
// 		if(result){
// 			res.json({
// 				err: '0',
// 				data: result
// 			})
// 		}else{
// 			res.json({
// 				err: '-1',
// 				msg: '未找到该文章'
// 			})
// 		}
// 	})
// });

module.exports = router;