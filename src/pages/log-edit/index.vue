<style>
	.form-group > div {
		margin-top: 18px;
	}
	.checkbox-list button {
		display: block;
		float: left;
		margin: 0 12px 14px 0;
	}
	.btn-info-light {
		background-color: #c8f1fd;
		border-color: #a1dbec;
		color: #fff;
	}
	.btn-info-light .badge {
	    color: #5bc0de;
	    background-color: #fff;
	}
	.btn-left-attach {
	    float: left;
	    width: 18px;
	    line-height: 34px;
	    font-weight: bold;
	    /* padding: 2px; */
	    height: 100%;
	    border-radius: 4px 0 0 4px;
	    background-color: #488192;
	    /*border: 1px solid #488192;*/
	}
	.btn-right-attach {
		float: right;
		height: 100%;
		padding: 6px 10px;
	}
	.tag-btn {
		padding: 0;
		height: 34px;
	}

</style>
<template>
	<div class="form-horizonta">	
		<div class="form-group">
			<div class="input-group col-sm-6">
				<span class="input-group-addon">标题</span>
				<input class="form-control" type="text" v-model="title">
			</div>
			<div class="input-group date form_datetime col-sm-4">
				<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
			    <input class="form-control task-edit-date-input" size="16" v-model="createdDate" type="text">
			</div>{{ weekendTip}}
			<div class="input-group col-sm-6">
				<span class="input-group-addon">内容</span>
				<textarea class="form-control" placeholder="描述" v-model="content"></textarea>
			</div>
			<div class="input-group col-sm-4">
				<span class="input-group-addon">评分</span>
				<input type="number" class="form-control" v-model="marks">
			</div>
			<div class="btn-group">
				<button type="button" class="btn btn-primary task-save-btn" @click="submit">保存</button>
				<button v-if="!!id" type="button" class="btn btn-default task-save-btn" @click="delTask(id)">删除</button>
			</div>
		</div>
	</div>
</template>
<script>
	var moment = require('moment');
	module.exports = {
		props: {
			list: Array
		},
		data: function(){
			return {
				id: Global.searchObj.id || '',
				content: '', 
				createdDate: '',
				weekendTip: '',
				marks: '',
				title: ''
			}
		},
		created: function(){
			var me = this;
			this.getWeekendTip();

			
			if(this.id){
				$.ajax({
					url: '/log/queryitem',
					data: {
						id: me.id
					}
				}).done(function(data){
					if(data.err === '0'){
						var result = data.data;
						var obj = {
							content: result.content,
							title: result.title, 
							createdDate: moment(result.date).format('YYYY-MM-DD') + ' ' + PowerFn.getDayFromDate(result.date),
							marks: result.marks
						}
						console.log(obj)
						for(var attr in obj){
							me[attr] = obj[attr];
						}
					}


				})
			}else{		
				debugger;
				var date = moment(new Date).subtract('day', 1);
				var dayStr =  date.day() === 0 ? '日' : PowerFn.parseNumUpper(date.day());
				this.createdDate = date.format('YYYY-MM-DD') + ' 周' + dayStr;;
			}
		},
		mounted: function(){
			var me = this;
			$('.form_datetime').datetimepicker({
    	        language:  'zh-CN',
    	        format: 'yyyy-mm-dd',
    	        weekStart: 1,
    	        todayBtn:  1,
    			autoclose: 1,
    			todayHighlight: 1,
    			startView: 2,
    			forceParse: 0,
    	        minView: 2
    	        // showMeridian: 1
    	    }).on('changeDate', function(e){
    	    	var date = moment(e.date).format('YYYY-MM-DD');
    	    	var day = PowerFn.getDayFromDate(e.date);
    	    	me.createdDate = date + ' ' + day;;

    	    });
    	    $('body').on('click', '.tag-btn', function(){
				$(this).find('.badge').addClass('animated fadeInDown');
    	    });
    	    $('body').on('animationend', '.badge',function(){
				$(this).removeClass('animated fadeInDown');
			});
		},
		watch: {
			createdDate: function(){
				this.getWeekendTip();
			}
		},
		methods: {
			getWeekendTip: function(){
				var day = moment(this.createdDate).day();
				if(day === 6){
					this.weekendTip = '周六';
				}else if(day === 0){
					this.weekendTip = '周日'
				}else{
					this.weekendTip = '';

				}
			},
			delTask: function(id){
				$.ajax({
					type: 'delete',
					url: '/log/del',
					data: {
						id: id
					}
				}).done(function(data){
					if(data.err === '0'){
						alert('删除成功');
						history.go('-1');
					}
				})
			},
			submit: function(){
				var me = this;
				debugger;
				$.ajax({
					url: '/log/saveitem',
					data: {
						date: me.createdDate.split(' ')[0],
						id: me.id,
						title: me.title,
						content: me.content,
						marks: me.marks
					}
				}).done(function(data){
					if(data.err === '0'){
						alert('保存成功');
						history.go('-1');
					}else{
						alert(data.msg);
					}
				})
			}
		}
	};
</script>