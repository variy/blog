<template>
	<div class="form-horizonta">	
		<div class="form-group">
			<div class="input-group date form_datetime col-md-5" data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
			    <input class="form-control task-edit-date-input" size="16" type="text" :value="date">
			    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
			</div>
			<input type="hidden" id="dtp_input1" value="" /><br/>
			<div class="input-group">
				<span class="input-group-addon">标题</span>
				<input class="form-control" v-model="title">
			</div>
			<div class="input-group">
				<span class="input-group-addon">金额(元)</span>
				<input class="form-control" type="number">
			</div>
			<div>
				<select class="form-control width-a" v-model="bigC">
					<option  v-for="item in bigCategories" :value="item.value">{{ item.txt}}</option>
				</select>
				<select class="form-control width-a" id="repeat-type-select" value="">
					<option  v-for="item in categories" :value="item.value">{{ item.txt}}</option>
				</select>
					<button class="btn btn-default btn-xs pukk-right" type="button">类型编辑</button>
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
			_title: String,
			_content: String,
			id: String,
			date: String,
			allList: Object,
			bigCategories: Array
		},
		data: function(){
			return {
				title: '', 
				content: '',
				bigC: '',
				categories: ''
			}
		},
		created: function(){
			$('.task-edit-date-input').val(this.date);
			this.title = this._title || '';
			this.content = this._content || '';
			this.bigC = 'expend';
		},
		watch: {
			'bigC': function(v){
				console.log(v);
				this.categories = this.allList[v];
			}
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
				 console.log($('#repeat-type-select').val());
				$.ajax({
					url: '/expense/saveitem',
					data: {
						title: me.title,
						date: $('.task-edit-date-input').val(),
						repeatType: $('#repeat-type-select').val(),
						content: me.content,
						id: me.id
					}
				}).done(function(data){
					if(data.err === '0'){
						alert('保存成功');
					}else{
						alert(data.msg);
					}
				})
			}
		}
	};
</script>