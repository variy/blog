var expenseComp = require('./index');

var map = [
	{value: 'funds', txt: '资产'},
	{value: 'receivables', txt: '应收欠款'},
	{value: 'due', txt: '负债'}
];
var allList = {
	'funds': [
		{value: 'tuandaiwang', txt: '团贷网', amount: '200000'},
		{value: 'mayijubao', txt: '蚂蚁聚宝', amount: '20000'},
		{value: 'receivables', txt: '应收欠款', amount: '48600'},
		{value: 'liudongzijin', txt: '流动资金', amount: '3500'},
	],
	'receivables': [
		{value: 'wangxingyao', txt: '王星耀', amount: '33600'},
		{value: 'xiongguocheng', txt: '熊果诚', amount: '10000'}
	],
	'due': [
		{value: 'jiangsuBank', txt: '江苏银行'},
		{value: 'guangfaBank', txt: '广发银行'},
	]

};

var loanModelList = [
	{value: 'daoqibenxi', txt: '到期本息'},
	{value: 'dengebenxi', txt: '等额本息'},
	{value: 'meiyuefuxi', txt: '每月付息'}
]
$(function() {
	new Vue({
		template: '<expense :bigCategories="map" :allList="allList" :loanModelList="loanModelList"></expense>',
		components: {
			expense: expenseComp
		},
		data: {
			map: map,
			allList: allList,
			loanModelList: loanModelList
		}
	}).$mount('#stage');
})