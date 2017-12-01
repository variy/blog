var moment = require('moment');
var expenseMap = {
	'food': '食物',
	'clothes': '衣服',
	'static': '固定支出',
	'play': '玩儿',
	'quality': '品质',
	'daily': '日用品',
	'health': '健康',
	'date': '约会',
	'travel': '旅行',
	'treat': '请客吃饭',
};
var fundsMap = {
	'tuandaiwang': '团贷网',
	'mayijubao': '蚂蚁聚宝',
	'liudongzijin': '流动资金'
}
var numUpperMap = {
	'1': '一',
	'2': '二',
	'3': '三',
	'4': '四',
	'5': '五',
	'6': '六'
};
var timeMap = {
	'gym': '健身',
	'health': '健康',
	'learn': '学习',
	'living': '技能',
	'draw': '画画',
	'social': 'social',
	'play': '玩',
	'date': '约会'
};
var o = {
	parseExpense: function(v){
		return expenseMap[v] || '';
	},
	parseFunds: function(v){
		return fundsMap[v] || '';
	},
	parseTime: function(v){
		return timeMap[v] || '';
	},
	parseNumUpper: function(v){
		return numUpperMap[v] || '';
	},
	getDayFromDate: function(date){
		var day = moment(date).day();
		var dayStr = day === 0 ? '日' : numUpperMap[day];
		return '周' + dayStr;
	},
	commafy: function(num){
		return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
	}
}

module.exports = o;