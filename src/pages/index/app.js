import App from './a.vue';
var  ArticleList = require('./article-list.vue');

$(function() {
	new Vue({
		render: h => h(App)
	}).$mount('#app1');

	$.ajax({
		url: '/user/checklogin',
	}).done(function(){
		debugger;
	});;

	$.ajax({
		url: '/article/listquery',
		data: {
			ps: '2',
			pn: Global.searchObj.page || '1'
		}
	}).done(function(data){
		if(data.err === '0'){
			var result = data.data;
			new Vue({
				template: '<article-list :articles = "articles" :pageCount="pageCount"></article-list>',
				data: {
					articles: result.list,
					pageCount: result.pc
				},
				components: {
				  'article-list': ArticleList
				}
			}).$mount('#article-box');
		}
	})

});