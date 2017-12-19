require('./css/bootstrap.css');
require('./css/bootstrap-datetimepicker.css');
require('./css/animate.css');

require('./css/dialog.css');
require('./css/index.css');

require('./libs/bootstrap.js');
require('./libs/bootstrap-datetimepicker.js');
require('./libs/bootstrap-datetimepicker.zh-CN.js');

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

$(function(){
	require('./components/header-nav')	
});	

module.exports = {
	reqDomain: GLOBALOPTS.requestDomain || '',
	searchObj: searchObj,
	eventHub: new Vue,
	locals: {}
};