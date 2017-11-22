<style>
	.form-group > div {
		margin-top: 18px;
	}

</style>
<template>
	<div class="form-horizonta">	
		<div class="form-group">
			<div>
				<select class="form-control width-a" v-model="bigC" :disabled="!!genus">
					<option  v-for="item in bigCategories" :value="item.value">{{ item.txt}}</option>
				</select>&nbsp;&nbsp;
				<select class="form-control width-a" id="repeat-type-select" v-model="type">
					<option  v-for="item in categories" :value="item.value">{{ item.txt}}</option>
				</select>
				<button class="btn btn-default btn-xs pukk-right" disabled type="button">类型编辑</button>
			</div>
			<div class="input-group date form_datetime col-sm-4">
				<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
			    <input class="form-control task-edit-date-input" size="16" type="text">
			</div>
			<div class="input-group col-sm-4">
				<span class="input-group-addon">金额</span>
				<input class="form-control" v-model="amount" type="number">
			</div>
			<div class="input-group col-sm-6">
				<span class="input-group-addon">备注</span>
				<input type="text" class="form-control" v-model="title">
			</div>
			<div>
				周期:<input class="inline-b mrl-10" v-model="cycle" style="width: 180px;"  type="range" step="1" min="01" max="24">
				<span>&nbsp;&nbsp; {{ cycle}}月，{{ _date}}到期</span>
			</div>
			<div class="checkbox">
				<label>
					<input type="checkbox"> 结清
				</label>
			</div>
			
			<div class="btn-group">
				<button type="button" class="btn btn-primary task-save-btn" @click="submit">保存</button>
				<button v-if="!!id" type="button" class="btn btn-default task-save-btn" @click="delTask(id)">删除</button>
			</div>
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
				type: '',
				cycle: 1
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
				if(this.bigC === 'expend'){
					$.ajax({
						url: '/expense/saveitem',
						data: {
							title: me.title,
							date: $('.task-edit-date-input').val(),
							amount: me.amount,
							type: me.type,
							id: me.id
						}
					}).done(function(data){
						if(data.err === '0'){
							alert('保存成功');
							history.go('-1');
						}else{
							alert(data.msg);
						}
					})
				}else if(this.bigC === 'funds'){
					$.ajax({
						url: '/funds/saveitem',
						data: {
							createdDate: $('.task-edit-date-input').val(),
							principal: me.amount,
							target: me.type,
							id: me.id,
							decribe: me.title
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
		}
	};
</script>