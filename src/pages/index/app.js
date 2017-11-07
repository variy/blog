let headerTpl = require('./header-nav');
var  ArticleList = require('./article-list.vue');
var  userInfo = require('./user-info.vue');
var loginFn = require('../../components/login-dialog/index.js');
$(function() {
	
	$('#header').html(headerTpl())
	$('.login-btn').click(function(){
		loginFn();

	})
	$.ajax({
		url: Global.reqDomain + '/user/checklogin',
	}).done(function(data){
		if(data.err === '0'){
			if(data.data.isLogin){
				new Vue({
					template: '<login-info :isLogin="isLogin" :username="username"></login-info>',
					data: {
						isLogin: data.data.isLogin,
						username: data.data.username
					},
					components: {
						'login-info': userInfo
					},
				}).$mount('#header-userinfo-area');
			}else{
				loginFn();
			}
			
		}else{
			alert(data.msg)
		}
		
	});;

	// $.ajax({
	// 	url: Global.reqDomain + '/article/listquery',
	// 	data: {
	// 		ps: '2',
	// 		pn: Global.searchObj.page || '1'
	// 	}
	// }).done(function(data){
	// 	if(data.err === '0'){
	// 		var result = data.data;
	// 		new Vue({
	// 			template: '<article-list :articles = "articles" :pageCount="pageCount"></article-list>',
	// 			data: {
	// 				articles: result.list,
	// 				pageCount: result.pc
	// 			},
	// 			components: {
	// 			  'article-list': ArticleList
	// 			}
	// 		}).$mount('#article-box');
	// 	}
	// });
});