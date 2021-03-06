var path = require('path');
var webpack = require('webpack');
var moment = require('moment');

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');

var CONFIG = require('./config.js');
var pjPath = CONFIG.pj;
var srcPath = CONFIG.srcPath;
var destPath = CONFIG.destPath;
var DEBUG = CONFIG.debug;
var PORT = CONFIG.port;

var curJsDestPath = path.join(destPath, 'js');

var pageDefaultSetting = {
    filename: '',
    entry: 'app.js',
    chunks: ['vendors'],
    template: path.resolve(CONFIG.srcPath, './template.ejs'),
    inject: 'body',
    DEBUG: DEBUG
}

var pageList = fs.readdirSync(path.resolve(CONFIG.srcPath, './pages'));

console.log(JSON.stringify(pageList));

var getEntry = function(){
    var obj = {};
    for (var i = 0; i < pageList.length; i++) {
        var item = pageList[i];
        if( item=== '.DS_Store')continue;
        obj[item] =  path.join(srcPath, 'pages', item, pageDefaultSetting.entry);

    };
    obj.vendors = ['Jquery','Vue','underscore', 'moment', 'Global', 'PowerFn' , 'Dialog'];
    return obj;
}

var getHtmlPlugins = function(){
    var list = [];

    pageList.forEach(function(item) {
        //@chunks 这个参数告诉插件要引用entry里面的哪几个入口
        //@inject 要把script插入到标签里
        var opt = {
            template: pageDefaultSetting.template,
            params: {
                DEBUG: DEBUG,
                requestDomain: DEBUG? ('http://localhost:' + CONFIG.port) : ''
            },
            filename: item + '.html',
            chunks: ['vendors', item],
            inject: 'body'
        };

        if( !DEBUG ){
            opt.minify = {
                removeComments: true,
                collapseWhitespace: true
            }
        }

        list.push( new HtmlwebpackPlugin(opt) );
    });

    return list;
}

var otherPlugins = [];
if( !DEBUG ){
    otherPlugins = [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: DEBUG,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ];
}else{
    otherPlugins= [
        new webpack.HotModuleReplacementPlugin()
    ];
}

var webpackConfig = {
    entry: getEntry(),
    output: {
        path: destPath,
        // publicPath: './',
        publicPath: DEBUG ? ('http://localhost:' + PORT + '/') : './',
        filename: DEBUG ?"[name].js" : './pagejs/[name].[chunkhash:8].min.js',
        chunkFilename: DEBUG ? "[chunkhash:8].chunk.js" : "[chunkhash:8].chunk.min.js",
        sourceMapFilename: "./map/[file].map"
    },
    devtool: DEBUG? "source-map": false,
    module: {
        rules: [
        {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                //
                // [, pageDefaultSetting.template],
                // options: {
                //     presets: ['es2015']
                // }
            },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    // {{# sass}}
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    // {{/sass}}
                }
                        // other vue-loader options go here
            }
        },
            {
                // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                // 否则则调用file-loader，参数直接传入
                // 'url?limit=10000&name=img/[hash:8].[name].[ext]',
                // 'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                // /\.(png|jpe?g|gif|svg)(\?.*)?$/
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|eot|ttf|gif|ico)$/,
                use: [
                    'url-loader?limit=10240&name=images/[name].[hash:8].[ext]'
                    // ,'file?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                ]
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                exclude:  pageDefaultSetting.template
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    // publicPath:  DEBUG ? ('http://localhost:' + PORT + '/') : './'`
                })

                // ["style-loader", "css-loader"]


            }, {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                use: ['jsx', 'babel?presets[]=es2015,presets[]=react']
            }
        ]
    },
    // vue: {
    //     loaders: {
    //         js: 'babel'
    //     }
    // },
    resolve: {
        extensions: ['.js', '.ejs', '.jsx', '.css', '.vue'],
        // modules: [CONFIG.rootPath],
        alias: {
            underscore$: path.join( CONFIG.srcPath, '/libs/underscore.js'),
            Jquery$: path.join( CONFIG.srcPath, '/libs/jquery-3.2.1.js'),
            Global$: path.join( CONFIG.srcPath, '/init.js'),
            Vue$: path.join( CONFIG.srcPath, '/libs/vue.js'),
            PowerFn$: path.join( CONFIG.srcPath, '/power-fn.js'),
            Dialog$: path.join( CONFIG.srcPath, '/components/dialog/index.js'),
            // DEBUG ? '/libs/echarts.js':
            echarts$: path.join( CONFIG.srcPath,  '/libs/echarts.common.min.js')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new CommonsChunkPlugin({
            name: 'vendors',
            filename: DEBUG ? 'vendors.js' : '[name].[hash:8].min.js'
        }),

        // new ExtractTextPlugin({
        //     filename: "css/[name].[contenthash:8].css",
        //     disable: false,
        //     allChunks: true
        // }),

        new ExtractTextPlugin("styles.css"),

        new webpack.ProvidePlugin({
            $: 'Jquery',
            _: 'underscore',
            Global: 'Global',
            Vue: 'Vue',
            PowerFn: 'PowerFn',
            Dialog: 'Dialog',
            moment: moment
        })
    ].concat(getHtmlPlugins())
    .concat(otherPlugins)
};

if(DEBUG){
    for(var attr in webpackConfig.entry){
        if( ! Array.isArray(webpackConfig.entry[attr])){
            webpackConfig.entry[attr] = Array.of(webpackConfig.entry[attr]);
        }
        webpackConfig.entry[attr].push('webpack-hot-middleware/client?reload=true')
    }

    webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin())
}

module.exports = webpackConfig;
