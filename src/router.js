var routie = require('./libs/routie.js')
var taskEditComp = require('./views/task-edit.vue');
var indexComp = require('./views/task-list/index.vue');
var Category = require('./models/categories');
var category = {};

var el = document.getElementById('stage');
var moment = require('moment');
routie({
	'': function(){
		var cb = function(result){
			var list = result.data.map(function(item){
				delete item.meta;
				return item;
			});
			category = new Category(list, 'all')
			var list = category.listData;
			var vue = new Vue({
				template: '<index :list="list"></index>',
				components: {
					'index': indexComp
				},
				data: {
					list: list
				}
			});
			$(el).empty();
			el.appendChild(vue.$mount().$el);
		};
		$.ajax({
			url: '/task/query'
		}).done(function(result) {
			cb(result);
			Global.eventHub.$on('toggleDone', function(opt) {
	            $.ajax({
	                url: '/task/saveitem',
	                data: opt
	            }).done(function(data){
	                if(data.err === '0'){
	                	$.ajax({
							url: '/task/query'
						}).done(function(result) {
							cb(result);
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
				id: '',
				repeatType: 'none'
			};
			if(result.date){
				result.date = moment(result.date).format('YYYY-MM-DD');
			}
			result.id = result._id;
			var vue = new Vue({
				template: '<task-edit :_isFinished="done" :_title="title" :date="date" :_content="content" :id = "id" :repeatType="repeatType"></task-edit>',
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