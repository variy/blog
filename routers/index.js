var express = require('express');
var router = express.Router();
var User = require('../app/controllers/user.js')
var Task = require('../app/controllers/task.js')
var Expense = require('../app/controllers/expense.js')
var Funds = require('../app/controllers/funds.js')
var Time = require('../app/controllers/time.js')
var Diet = require('../app/controllers/diet.js')



// var Article = require('../models/article.js')

router.get('/user/checklogin', User.checkLogin);

router.get('/user/logout', User.logout);

router.get('/user/login', User.login);

router.post('/user/register', User.register);

router.get('/user/listquery', User.signinRequired, User.adminRequire, User.list);

router.get('/task/saveitem', User.signinRequired, Task.save);

router.get('/task/query', User.signinRequired, Task.list);

router.get('/task/queryitem', User.signinRequired, Task.queryitem);

router.delete('/task/del', User.signinRequired, Task.delItem);

//消费
router.get('/expense/saveitem', User.signinRequired, Expense.save);
router.get('/expense/query', User.signinRequired, Expense.list);
router.get('/expense/queryitem', User.signinRequired, Expense.queryitem);
router.delete('/expense/del', User.signinRequired, Expense.delItem);

//资金 
router.get('/funds/saveitem', User.signinRequired, Funds.save);
router.get('/funds/query', User.signinRequired, Funds.list);
router.get('/funds/queryitem', User.signinRequired, Funds.queryitem);
router.delete('/funds/del', User.signinRequired, Funds.delItem);

// 时间
router.get('/time/saveitem', User.signinRequired, Time.save);
router.get('/time/query', User.signinRequired, Time.list);
router.get('/time/queryitem', User.signinRequired, Time.queryitem);
router.delete('/time/del', User.signinRequired, Time.delItem);

// 饮食
router.get('/diet/saveitem', User.signinRequired, Diet.save);
router.get('/diet/query', User.signinRequired, Diet.list);
router.get('/diet/queryitem', User.signinRequired, Diet.queryitem);
router.delete('/diet/del', User.signinRequired, Diet.delItem);

module.exports = router;