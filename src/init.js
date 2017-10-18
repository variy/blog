require('./css/bootstrap.css');
require('./css/index.css');

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
	

module.exports = {
	reqDomain: GLOBALOPTS.requestDomain || '',
	searchObj: searchObj
};