var index = require('./index');
var moment = require('moment');
$(function() {
		

	$.ajax({
		url: '/funds/query'
	}).done(function(data){
		var fundsList = data.data;
		fundsList.map(function(item){
			item.createdDate = moment(item.createdDate).format('YYYY-MM-DD');
			item.finishedDate = moment(item.finishedDate).format('YYYY-MM-DD');
			item.category = PowerFn.parseFunds(item.category);
			item.evalTotalAmont = PowerFn.commafy(item.evalTotalAmont);
			item.principal = PowerFn.commafy(item.principal);

			return item;
		})
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