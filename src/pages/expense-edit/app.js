var expenseComp = require('./index');
var categories = [
	{value: 'food', txt: '食物'},
	{value: 'clothes', txt: '衣服'},
	{value: 'static', txt: '固定支出'},
	{value: 'play', txt: '玩儿'},
	{value: 'quality', txt: '品质'},
	{value: 'daily', txt: '日用品'},
	{value: 'health', txt: '健康'},
	{value: 'travel', txt: '旅行'},

]
var map = [
	{value: 'expend', txt: '消费'},
	{value: 'property', txt: '资产'},
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
	],
	'property': [
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
	new Vue({
		template: '<expense :_title="title" :bigCategories="map" :_content="content" :allList="allList"></expense>',
		components: {
			expense: expenseComp
		},
		data: {
			title: 'test',
			content: 'test content',
			allList: allList,
			map: map
		}
	}).$mount('#stage');

	$('.form_datetime').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        // startDate: new Date(),
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
        minView: 2
        // showMeridian: 1
    });

    $.ajax({
    	url: '/expense/query',
    	success: function(data){
    		console.log(data)
    	}
    })
})