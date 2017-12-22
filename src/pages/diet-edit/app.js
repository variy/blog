var index = require('./index');

var map = [
	{value: 'excessiveStaple', txt: '主食过量', icon: 'scale'},
	{value: 'nightsnack', txt: '夜宵', icon: ''},
	{value: 'snacks', txt: '零食', icon: 'knight'},
	{value: 'hotpot', txt: '火锅', icon: 'fire'},
	{value: 'together', txt: '聚餐', icon: ''},
	{value: 'date', txt: '约会', icon: 'heart-empty'},
	{value: 'sugarydrinks', txt: '含糖饮料', icon: ''},
	{value: 'candy', txt: '糖果', icon: ''},
	{value: 'puffingOrFries', txt: '膨化或油炸', icon: ''}
];

$(function() {
	new Vue({
		template: '<index :list="list"></index>',
		components: {
			index: index
		},
		data: {
			list: map
		}
	}).$mount('#stage');
})