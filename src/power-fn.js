var expenseMap = {
	'food': '食物',
	'clothes': '衣服',
	'static': '固定支出',
	'play': '玩儿',
	'quality': '品质',
	'daily': '日用品',
	'health': '健康',
	'travel': '旅行',
	'treat': '请客吃饭',
};
var fundsMap = {
	'tuandaiwang': '团贷网',
	'mayijubao': '蚂蚁聚宝',
	'liudongzijin': '流动资金'
}
var o = {
	parseExpense: function(v){
		return expenseMap[v] || '';
	},
	parseFunds: function(v){
		return fundsMap[v] || '';
	},
	commafy: function(num){
		return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	}
}

module.exports = o;