process.env.NODE_ENV = 'development';

var express = require('express');
var webpack = require('webpack');
var mongoose = require('mongoose');
// var cors = require('cors');
var path = require('path');
var fs = require('fs');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConf = require('./webpack.conf.js');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

mongoose.Promise = global.Promise;

var app = express();
var CONFIG = require('./config.js');
var PORT = CONFIG.port;
var destPath = CONFIG.destPath;
var routerPath = CONFIG.routerPath;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// if(CONFIG.debug){
//     app.use(cors({
//         origin: 'http://localhost:' + CONFIG.devPort,
//         methods: ['GET', 'POST', 'PUT']
//     }))
// }

app.use(cookieParser());
app.use(session({
    secret: 'hjhjhh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        domain: 'localhost'
    }
}));

// models loading
var models_path = __dirname + '/app/models'
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file
      var stat = fs.statSync(newPath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath)
        }
      }
      else if (stat.isDirectory()) {
        walk(newPath)
      }
    })
}
walk(models_path)
app.use(require(routerPath));

var compiler = webpack(webpackConf);
app.use(express.static(path.resolve(__dirname, CONFIG.srcPath)));
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath,
    // hot: true,
    noInfo: false,
    inline: true,
    stats: {
        cached: false,
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

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