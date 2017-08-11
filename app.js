process.env.NODE_ENV = 'development';

var express = require('express');
var webpack = require('webpack');
var mongoose = require('mongoose');
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
if( CONFIG.debug){

    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var configPath = path.join(__dirname, './webpack.conf.js')
    // console.log(configPath)

    var config = require(configPath);
    // console.log(configPath)

    var compiler = webpack(config);
    /*为什么这里的路径要配成 ./public 呢*/
    app.use(express.static(path.resolve(__dirname, CONFIG.srcPath)));
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
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

}else{
    // 调试生产地址，请求本地编译后的代码
    app.use(express.static( path.resolve(__dirname, CONFIG.destPath)));
}
    