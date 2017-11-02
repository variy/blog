let headerTpl = require('./header-nav');
var  ArticleList = require('./article-list.vue');
var  userInfo = require('./user-info.vue');
var taskEditTpl = require('./task-edit');
$(function() {
	$.ajax({
		url: '/task/query'
	}).done(function(){
		
	})
	$('#header').html(headerTpl())
	$('.login-btn').click(function(){
		require('../../components/login-dialog/index.js')();

	})
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
				'login-info': userInfo
			},
		}).$mount('#header-userinfo-area');
	});;

	$('<div class="container"></div>').html(taskEditTpl).appendTo('body');
	$('.form_datetime').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        startDate: new Date(),
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
        minView: 2
        // showMeridian: 1
    });


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