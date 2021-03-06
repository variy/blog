var headerTpl = require('./tpl');
var loginFn = require('../login-dialog');
var  userInfo = require('./user-info.vue');

$('<header></header>').html(headerTpl()).prependTo('body');
$('.login-btn').click(function(){
	loginFn();
});

var page = location.href.split('/').pop().split('.')[0];
$('[data-link='+page+']').addClass('active');
$('[data-link]').click(function(){
	location.href = './' + $(this).data('link') + '.html';
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