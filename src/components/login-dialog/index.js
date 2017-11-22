
module.exports = function(){
	var App = require('./a.vue');
	new Dialog({
		body: '<div id="login-dialog-box"></div>',
		beforeshow: function(){
			new Vue({
				template: '<login-info :isLogin="isLogin"></login-info>',
				data: {
					isLogin: false
				},
				components: {
					'login-info': App
				}
			}).$mount('#login-dialog-box')
		}
	});
}