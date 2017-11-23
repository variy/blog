var expenseComp = require('./index');
var moment = require('moment');

var map = [
	{value: 'funds', txt: '资产'},
	{value: 'receivables', txt: '应收欠款'},

];
var allList = {
	'funds': [
		{value: 'tuandaiwang', txt: '团贷网', amount: '200000'},
		{value: 'mayijubao', txt: '蚂蚁聚宝', amount: '20000'},
		{value: 'receivables', txt: '应收欠款', amount: '48600'},
		{value: 'valid', txt: '流动资金', amount: '3500'},
	],
	'receivables': [
		{value: 'wangxingyao', txt: 'wangxingyao', amount: '33600'},
		{value: 'wujunliang', txt: 'wujunliang', amount: '10000'},
		{value: 'xiongguocheng', txt: 'xiongguocheng', amount: '10000'},
		{value: 'lifufeng', txt: 'lifufeng', amount: '5000'}

	]

}
$(function() {
	$(function(){
	    var id = Global.searchObj.id;
	    var cb = function(opts){
	    	opts = opts || {};
	    	var defaultOpts = {
	    		date: moment(new Date).format('YYYY-MM-DD'),
	    		title: '',
	    		type: '',
	    		allList: allList,
	    		id: Global.searchObj.id,
	    		amount: 0,
	    		map: map
	    	}
	    	for(var attr in defaultOpts){
	    		if(!(attr in opts)){
	    			opts[attr] = defaultOpts[attr];
	    		}
	    	}
    		new Vue({
    			template: '<expense :bigCategories="map" :allList="allList"></expense>',
    			components: {
    				expense: expenseComp
    			},
    			data: opts
    		}).$mount('#stage');

    		
	    }
	    if( id){
	        $.ajax({
	            url: '/'+ Global.searchObj.genus	+'/queryitem',
	            data: {
	                id: id
	            }
	        }).done(function(data){
	            if(data.err === '0'){
	            	var result = data.data;
	            	result.date = moment(result.date).format('YYYY-MM-DD')
                	cb(result)
	            }
	        })
	    }else{
	    	cb({})
	    }
	});
		
})