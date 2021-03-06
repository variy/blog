var tpl = require('./tpl');
var userCom = require('./user-list.vue');

$(function(){
	$('#page-container').html(tpl());
	$.ajax({
		url: '/user/listquery'
	}).done(function(data){
		if(data.err === '0'){
			new Vue({
				template: '<user-list :list="list"></user-list>',
				data: {
					list: data.data.list
				},
				components: {
					'user-list': userCom
				}
			}).$mount('#page-container')
		}else{
			alert(data.msg)
		}
		
	})
})