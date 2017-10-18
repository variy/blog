process.env.NODE_ENV = 'development';

var express = require('express');
var webpack = require('webpack');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');

var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var Article = require('./models/article');

mongoose.Promise = global.Promise;

var app = express();
var CONFIG = require('./config.js');
var PORT = CONFIG.port;
var destPath = CONFIG.destPath;
var routerPath = CONFIG.routerPath;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'hjhjhh',
    resave: false,
    saveUninitialized: true
}));
if(CONFIG.debug){
    app.use(cors({
        origin: 'http://localhost:' + CONFIG.devPort,
        methods: ['GET', 'POST', 'PUT']
    }))
}
// app.use(function(req, res, next){
//     if()
// });

app.use(require(routerPath));
mongoose.connect('mongodb://' + CONFIG.dbUri, {
    useMongoClient: true
});
var db = mongoose.connection;
db.once('open', function(){
    app.listen(PORT, function () {
      console.log('Server listening at port', PORT);
    });
});
db.on('error', function(){
    console.log('connection error');
});   