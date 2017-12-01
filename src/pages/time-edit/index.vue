<style>
	.form-group > div {
		margin-top: 18px;
	}
	.checkbox-list label {
		display: block;
		float: left;
		width: 20%;
		margin: 0 12px 14px 0;
	}
</style>
<template>
	<div class="form-horizonta">	
		<div class="form-group">
			<div class="input-group date form_datetime col-sm-4">
				<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
			    <input class="form-control task-edit-date-input" size="16" v-model="createdDate" type="text">
			</div>{{ weekendTip}}
			<div class="input-group col-sm-8 checkbox-list">
				    <label v-for="item in taskList">
			      		<input type="checkbox" :value="item.value" :checked="item.checked">
			      		<span :class="['glyphicon', 'glyphicon-' + item.icon]"></span> {{ item.txt}}
				    </label>
			</div>
			<div class="input-group col-sm-4">
				<span class="input-group-addon">描述</span>
				<input type="text" class="form-control" v-model="notes">
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
				notes: '', 
				createdDate: moment(new Date).format('YYYY-MM-DD'),
				weekendTip: '',
				marks: '',
				tasks: []
			}
		},
		created: function(){
			var me = this;
			this.getWeekendTip();

			this.taskList = this.list.map(function(item){
				if(me.tasks.indexOf(item.value) > -1){
					item.checked = true;
				}
				return item;
			});
			if(this.id){
				$.ajax({
					url: '/time/queryitem',
					data: {
						id: me.id
					}
				}).done(function(data){
					if(data.err === '0'){
						var result = data.data;
						var obj = {
							notes: result.notes, 
							createdDate: moment(result.date).format('YYYY-MM-DD'),
							marks: result.marks,
							tasks: result.tasks
						}
						console.log(obj)
						for(var attr in obj){
							me[attr] = obj[attr];
						}
					}


				})
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
    	    	var date = moment(e.date).format('YYYY-MM-DD')
    	    	me.createdDate = date;

    	    });
		},
		watch: {
			createdDate: function(){
				this.getWeekendTip();
			},
			tasks: function(){
				debugger;
				var me = this;
				this.taskList = this.list.map(function(item){
					if(me.tasks.indexOf(item.value) > -1){
						item.checked = true;
					}
					return item;
				});
			},
			taskList: function(){
				debugger;
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
					url: '/time/del',
					data: {
						id: id
					}
				}).done(function(data){
					if(data.err === '0'){
						alert('删除成功');
						location.hash='';
					}
				})
			},
			submit: function(){
				var me = this;
				var arr = [];
				$('.checkbox-list input:checked').each(function(i, item){
					arr.push($(this).val())
				})
				$.ajax({
					url: '/time/saveitem',
					data: {
						date: me.createdDate,
						id: me.id,
						notes: me.notes,
						tasks: arr,
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