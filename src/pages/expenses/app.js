var index = require('./index');
$(function() {
	new Vue({
		template: '<index></index>',
		components: {
			'index': index
		}
	}).$mount('#stage');
})