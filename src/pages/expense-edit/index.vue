<style>
	.form-group > div {
		margin-top: 18px;
	}

</style>
<template>
	<div class="form-horizonta">	
		<div class="form-group">
			<div class="input-group date form_datetime col-md-5">
			    <input class="form-control task-edit-date-input" size="16" type="text">
			    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
			</div>
			<div class="input-group">
				<span class="input-group-addon">标题</span>
				<input class="form-control" v-model="title">
			</div>
			<div class="input-group">
				<span class="input-group-addon">金额(元)</span>
				<input class="form-control" v-model="amount" type="number">
			</div>
			<div>
				<select class="form-control width-a" v-model="bigC" :disabled="!!genus">
					<option  v-for="item in bigCategories" :value="item.value">{{ item.txt}}</option>
				</select>
				<select class="form-control width-a" id="repeat-type-select" v-model="type">
					<option  v-for="item in categories" :value="item.value">{{ item.txt}}</option>
				</select>
					<button class="btn btn-default btn-xs pukk-right" disabled type="button">类型编辑</button>
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
			_type: String,
			id: String,
			_date: String,
			allList: Object,
			bigCategories: Array,
			_amount: Number
		},
		data: function(){
			return {
				title: '', 
				bigC: Global.searchObj.genus || 'expend',
				genus: Global.searchObj.genus,
				categories: '',
				amount: '',
				type: ''
			}
		},
		created: function(){
			this.amount = this._amount;
			this.title = this._title || '';
			this.type = this._type || '';
			this.categories = this.allList[this.bigC];

		},
		mounted: function(){
			$('.task-edit-date-input').val(this._date);
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
						amount: me.amount,
						type: me.type,
						id: me.id,
						type: me.type
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