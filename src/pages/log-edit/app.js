var index = require('./index');

$(function() {
	new Vue({
		template: '<index ></index>',
		components: {
			index: index
		},
		data: {
			// list: map
		}
	}).$mount('#stage');
})