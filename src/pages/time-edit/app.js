var index = require('./index');

var map = [
	{value: 'health', txt: '健身', icon: 'scale'},
	{value: 'learn', txt: '学习', icon: ''},
	{value: 'living', txt: '技能', icon: 'fire'},
	{value: 'draw', txt: '画画', icon: ''},
	{value: 'social', txt: 'social', icon: 'knight'},
	{value: 'play', txt: '玩', icon: ''}
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