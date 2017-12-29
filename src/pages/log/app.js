var articleComp = require('./article.vue');
var moment = require('moment')
$(function(){
	$.ajax({
		url: '/log/query'
	}).done(function(data){
		console.log(data);
		var result = data.data.map(function(item){
			item.date = moment(item.date).format('YYYY-MM-DD');
			return item;
		});
		new Vue({
			el: '#app',
			template: '<app :list="list"></app>',
			components: {
				app: articleComp
			},
			data: function(){
				return {
					list: result
				}
			}
		})
	});
});