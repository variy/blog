var path = require('path');

console.log('>>> ' + process.argv)

var likelyPort = process.argv[2];
var port = Number(likelyPort) === Number(likelyPort) ? likelyPort : '8081';

var paramObj = {},
    defaultOpts = {};
var argvs = process.argv.slice(2);

for(var i=0; i< argvs.length; i++){
    if(argvs[i].slice(0,2) !== '--')continue;
    var arr = argvs[i].slice(2).split('=');
    paramObj[arr[0]] = arr[1];
}

console.log('obj>>***>' + JSON.stringify(paramObj));
for(var attr in defaultOpts){
    if(!(attr in paramObj)){
        paramObj[attr] = defaultOpts[attr];
    }
}

module.exports = {
    debug: process.env.NODE_ENV === 'development',
    port: port,
    devPort: '8082',
    dbUri: 'localhost:27017/blog',
    srcPath:  path.join(__dirname, './src'),
    destPath: path.join(__dirname, './dist/'),
    routerPath: path.join(__dirname, './routers')
};