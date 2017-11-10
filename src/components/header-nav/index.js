var headerTpl = require('./tpl');
var loginFn = require('../login-dialog');
var  userInfo = require('./user-info.vue');

$('<header></header>').html(headerTpl()).prependTo('body');
$('.login-btn').click(function(){
	loginFn();
});

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