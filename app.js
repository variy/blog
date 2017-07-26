var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

/* 加了这句 查询的then方法不会提示报错，但是传参函数也不会执行*/
// mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

var User = mongoose.model('User', userSchema);

app.use('/pages',express.static( path.resolve(__dirname, './src/pages/')));
app.use(express.static( path.resolve(__dirname, './src/')));

mongoose.createConnection('mongodb://localhost:27017', function(err){
	if(err){
		console.log(err);
	}else{
		console.log('db connect success');

		var user = new User({
			username: '123',
			password: '456'
		});

		/* 提示mpromise 弃用*/
		// user.save(function(err, userInfo){
		// 	console.log('00000')
		// });
		
		/* 提示mpromise 弃用*/
		user.save().then(function(err, userInfo){
			console.log('00000')
		});
		app.listen('8081', function(){
			console.log('server listen on', 8081);
		});


	}
});




