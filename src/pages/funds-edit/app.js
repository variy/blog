var expenseComp = require('./index');
var moment = require('moment');

var map = [
	{value: 'expend', txt: '消费'},
	{value: 'funds', txt: '资产'},
	{value: 'receivables', txt: '应收欠款'},

];
var allList = {
	'expend':[
		{value: 'food', txt: '食物'},
		{value: 'clothes', txt: '衣服'},
		{value: 'static', txt: '固定支出'},
		{value: 'play', txt: '玩儿'},
		{value: 'quality', txt: '品质'},
		{value: 'daily', txt: '日用品'},
		{value: 'health', txt: '健康'},
		{value: 'travel', txt: '旅行'},
		{value: 'treat', txt: '请客吃饭'}
	],
	'funds': [
		{value: 'tuandaiwang', txt: 'tuandaiwang', amount: '200000'},
		{value: 'mayijubao', txt: 'mayijubao', amount: '20000'},
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
    			template: '<expense :id="id" :_amount="amount" :_date="date" :_title="title" :bigCategories="map" :_type="type" :allList="allList"></expense>',
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