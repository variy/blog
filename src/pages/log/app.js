var articleComp = require('./article.vue');

$(function(){
	$.ajax({
		url: '/log/query'
	}).done(function(data){
		console.log(data);
		var result = data.data;
		new Vue({
			el: '#app',
			template: '<app :title="title" :content="content" :time="time" :tagList="tagList"></app>',
			components: {
				app: articleComp
			},
			data: function(){
				return {
					title: result.title,
					content: result.content,
					time: '2015-09-09',
					tagList: result.tagList
				}
			}
		})
	});
});