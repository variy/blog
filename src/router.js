var routie = require('./libs/routie.js')
var taskEditComp = require('./views/task-edit.vue');
var indexComp = require('./pages/index/index.vue');
routie({
	'': function(){
		new Vue({
			template: '<index></index>',
			components: {
				'index': indexComp
			}
		}).$mount('#stage');
	},
	'!task-edit/:isNew': function(isNew) {
		new Vue({
			template: '<task-edit :_isFinished="isFinished" :_title="title"></task-edit>',
			components: {
				'task-edit': taskEditComp
			},
			data: {
				isFinished: true,
				'title': '父组件传过去的title'
			},
		}).$mount('#stage');
	}
})