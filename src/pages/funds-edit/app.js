var expenseComp = require('./index');

var map = [
	{value: 'funds', txt: '资产'},
	{value: 'receivables', txt: '应收欠款'},

];
var allList = {
	'funds': [
		{value: 'tuandaiwang', txt: '团贷网', amount: '200000'},
		{value: 'mayijubao', txt: '蚂蚁聚宝', amount: '20000'},
		{value: 'receivables', txt: '应收欠款', amount: '48600'},
		{value: 'liudongzijin', txt: '流动资金', amount: '3500'},
	],
	'receivables': [
		{value: 'wangxingyao', txt: 'wangxingyao', amount: '33600'},
		{value: 'xiongguocheng', txt: 'xiongguocheng', amount: '10000'}
	]

}
$(function() {
	new Vue({
		template: '<expense :bigCategories="map" :allList="allList"></expense>',
		components: {
			expense: expenseComp
		},
		data: {
			map: map,
			allList: allList
		}
	}).$mount('#stage');
})