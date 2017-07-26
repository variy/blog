var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
mongoose.Promise = require('bluebird');
var User = require('./models/user.js')
var router = require('./routers');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.createConnection('mongodb://localhost:27017', function(err){
	if(err){
		console.log(err);
	}else{
		console.log('db connect success');
		app.listen('8081', function(){
			// user.save(function(err){
			// 	console.log(err);

			// });
			// User.findOne({
			// 	username: '123'
			// }).then(function(result){
			// 	console.log(JSON.stringify(result));
			// })
			console.log('server listen on', 8081);
		});


	}
});

app.use(router);
app.use('/pages',express.static( path.resolve(__dirname, './src/pages/')));
app.use(express.static( path.resolve(__dirname, './src/')));


