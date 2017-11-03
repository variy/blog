var routie = require('./libs/routie.js')
var taskEditComp = require('./views/task-edit.vue');
var indexComp = require('./views/task-list/index.vue');
var Category = require('./models/categories');
var category = {};

var el = document.getElementById('stage');
var moment = require('moment');
window.Vue = Vue;
routie({
	'': function(){
		window.vue;
		$.ajax({
			url: '/task/query'
		}).done(function(result) {
			var list = result.data.map(function(item){
				delete item.meta;
				return item;
			});
			console.log(JSON.stringify(list))
			category = new Category(list, 'all')
			var list = category.listData;
			vue = new Vue({
				template: '<index :list="list"></index>',
				components: {
					'index': indexComp
				},
				created: function(){
					// category = new Category(list, 'all')
					// this.list = category.listData;
				},
				data: {
					list: list
				}
			});

			$(el).empty();
			el.appendChild(vue.$mount().$el);

			Global.eventHub.$on('toggleDone', function(opt) {
	            $.ajax({
	                url: '/task/saveitem',
	                data: opt
	            }).done(function(data){
	                if(data.err === '0'){
	                	// location.reload();
	                	$.ajax({
							url: '/task/query'
						}).done(function(result) {
							var list = result.data.map(function(item){
								delete item.meta;
								return item;
							});
							debugger;
							category = new Category(list, 'all')
							var list = category.listData;
							for(var attr in list){
								// (vue.$data.list)[attr] = list[attr]
								Vue.set(vue.$data.list, attr, list[attr])
							}
						});
	                }
	            });
	        });
		});

        
			
	},
	'!task-edit/:id': function(id) {
		if(id === '0'){
			cb();
		}else{
			$.ajax({
				url: '/task/queryitem',
				data: {
					id: id
				}
			}).done(function(data){
				if(data.err === '0'){
					cb(data.data)
				}
			})
		}

		function cb(data){
			var result = data || {
				done: false,
				title: '',
				date: '',
				content: '',
				id: ''
			};
			if(result.date){
				result.date = moment(result.date).format('YYYY-MM-DD');
			}
			result.id = result._id;
			var vue = new Vue({
				template: '<task-edit :_isFinished="done" :_title="title" :date="date" :_content="content" :id = "id"></task-edit>',
				components: {
					'task-edit': taskEditComp
				},
				data: result,
			});
			$(el).empty();

			el.appendChild(vue.$mount().$el)

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
		}
			

	}
})