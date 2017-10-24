import App from './a.vue';
let headerTpl = require('./header-nav');
var  ArticleList = require('./article-list.vue');
var Dialog = require('../../components/dialog');
 new Dialog;
$(function() {
	$('#header').html(headerTpl())
	$.ajax({
		url: Global.reqDomain + '/user/checklogin',
	}).done(function(data){
		new Vue({
			template: '<login-info :isLogin="isLogin" :username="username"></login-info>',
			data: {
				isLogin: data.data.isLogin,
				username: data.data.username
			},
			components: {
				'login-info': App
			},
		}).$mount('#app1');
	});;

	$.ajax({
		url: Global.reqDomain + '/article/listquery',
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