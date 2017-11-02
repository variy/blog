require('./css/bootstrap.css');
require('./css/bootstrap-datetimepicker.css');
require('./css/dialog.css');
require('./css/index.css');

require('./libs/bootstrap.js');
require('./libs/bootstrap-datetimepicker.js');
require('./libs/bootstrap-datetimepicker.zh-CN.js');
var Dialog = require('./components/dialog');

var searchObj = (function(){
	var obj = {};
	if(location.search){
		var arr = decodeURI(location.search).slice(1).split('&');
		for(var i=0; i< arr.length; i++){
			var n = arr[i].indexOf('=');
			obj[arr[i].slice(0, n)] = arr[i].slice(n+1)
		}
	}
	return obj;
})();

setTimeout(function(){
	require('./router.js')
}, 0);	

module.exports = {
	reqDomain: GLOBALOPTS.requestDomain || '',
	searchObj: searchObj,
	Dialog: Dialog,
	eventHub: new Vue
};