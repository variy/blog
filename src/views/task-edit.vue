<template>
	<div class="form-horizonta">	
		<div class="form-group">
			<div class="input-group date form_datetime col-md-5" data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
				<span class="input-group-addon">
					<input type="checkbox" v-model="isFinished">
				</span>
			    <input class="form-control task-edit-date-input" size="16" type="text" :value="date">
			    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
			</div>
			<input type="hidden" id="dtp_input1" value="" /><br/>
			<div class="input-group">
				<span class="input-group-addon">标题</span>
				<input class="form-control" v-model="title">
			</div>
			<div>
				<select class="form-control width-a" id="repeat-type-select" :value="repeatType">
					<option value="none">没有</option>
					<option value="day">每天</option>
					<option value="week">每周</option>
					<option value="month">每月</option>
				</select>
				<span>重复</span>
			</div>
				
			<div class="input-group">
				<textarea v-model="content"></textarea>
			</div>
			<button type="button" class="btn btn-primary task-save-btn" @click="submit">保存</button>
			<button v-if="!!id" type="button" class="btn btn-danger task-save-btn" @click="delTask(id)">删除</button>
		</div>
	</div>
</template>
<script>
	module.exports = {
		props: {
			_isFinished: Boolean,
			_title: String,
			_content: String,
			id: String,
			date: String,
			repeatType: String
		},
		data: function(){
			return {
				isFinished: false, 
				title: '', 
				content: ''
			}
		},
		created: function(){
			$('.task-edit-date-input').val(this.date);
			this.isFinished = this._isFinished || false;
			this.title = this._title || '';
			this.content = this._content || '';
		},
		methods: {
			delTask: function(id){
				$.ajax({
					type: 'delete',
					url: '/task/del',
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
				$.ajax({
					url: '/task/saveitem',
					data: {
						title: me.title,
						date: $('.task-edit-date-input').val(),
						repeatType: $('#repeat-type-select').val(),
						content: me.content,
						id: me.id,
						done: me.isFinished
					}
				}).done(function(data){
					if(data.err === '0'){
						alert('保存成功');
						location.hash='';
					}else{
						alert(data.msg);
					}
				})
			}
		}
	};
</script>