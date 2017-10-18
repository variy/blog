process.env.NODE_ENV = 'development';

var express = require('express');
var webpack = require('webpack');
var path = require('path');
var CONFIG = require('./config.js');

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var configPath = path.join(__dirname, './webpack.conf.js')
// console.log(configPath)
var app = express();
var config = require(configPath);
// console.log(configPath)

var compiler = webpack(config);

var PORT = CONFIG.devPort;

// if( CONFIG.debug){
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

// }else{
//     // 调试生产地址，请求本地编译后的代码
//     app.use(express.static( path.resolve(__dirname, CONFIG.destPath)));
// }

app.listen(PORT, function () {
  console.log('Server listening at port', PORT);
});
 