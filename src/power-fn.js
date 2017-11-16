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
}
var o = {
	parseExpense: function(v){
		return expenseMap[v] || '';
	}
}

module.exports = o;