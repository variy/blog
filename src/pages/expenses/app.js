var index = require('./index');
$(function() {
		

	$.ajax({
		url: '/funds/query'
	}).done(function(data){
		var fundsList = data.data;
		new Vue({
			template: '<index :fundsList="fundsList"></index>',
			components: {
				'index': index
			},
			data: function(){
				return {
					fundsList: fundsList
				}
			}
		}).$mount('#stage');

	})
})