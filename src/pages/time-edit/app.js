var index = require('./index');

var map = [
	{value: 'gym', txt: '健身', icon: 'scale'},
	{value: 'health', txt: '健康', icon: ''},
	{value: 'learn', txt: '学习', icon: 'knight'},
	{value: 'living', txt: '技能', icon: 'fire'},
	{value: 'draw', txt: '画画', icon: ''},
	{value: 'social', txt: 'social', icon: 'cutlery'},
	{value: 'play', txt: '玩', icon: 'camera-retro icon-lg'},
	{value: 'date', txt: '约会', icon: 'heart-empty'},
	{value: 'daytoday', txt: '日常', icon: ''},
	{value: 'wastetime', txt: '浑浑噩噩', icon: ''},
	{value: 'movie', txt: '看电影', icon: ''}
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