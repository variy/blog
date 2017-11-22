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
			    <input class="form-control task-edit-date-input" size="16" v-model="createdDate" type="text">
			</div>
			<div class="input-group col-sm-4">
				<span class="input-group-addon">本金</span>
				<input class="form-control" v-model="principal" type="number">
			</div>
			<div class="input-group">
				<span class="input-group-addon">备注</span>
				<input type="text" class="form-control" v-model="title">
			</div>
			<div>
				周期: &nbsp;{{ cycle}}月<input class="inline-b mrl-10" v-model="cycle" style="width: 180px;"  type="range" step="1" min="0" max="24">
				<span> &nbsp;&nbsp;{{ finishedDate}}到期</span>
			</div>
			<div class="input-group">
				<span>年收益率: &nbsp;{{yieldRate}}%</span>
				<input class="inline-b mrl-10" v-model="yieldRate" style="width: 180px;"  type="range" step="1" min="3" max="15">
				&nbsp;&nbsp;预计收益 {{ yield}}元。
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
	var moment = require('moment');
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
				cycle: 1,
				yieldRate: 5,
				principal: 10000,
				createdDate: '2017-11-01',
				finishedDate: ''
			}
		},
		created: function(){
			this.amount = this._amount;
			this.title = this._title || '';
			this.type = this._type || '';
			this.categories = this.allList[this.bigC];
			this.getFinishedDate();
			this.getYield();
		},
		mounted: function(){
			var me = this;
			// $('.task-edit-date-input').val(this._date);
			$('.form_datetime').datetimepicker({
    	        language:  'zh-CN',
    	        format: 'yyyy-mm-dd',
    	        // startDate: new Date(),
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
			'bigC': function(v){
				console.log(v);
				this.categories = this.allList[v];
			},
			createdDate: function(){
				this.getFinishedDate();
			},
			cycle: function(){
				this.getFinishedDate();
				this.getYield();
			},
			principal: function(){
				this.getYield();
			},
			yieldRate: function(){
				this.getYield();
			}
		},
		methods: {
			getFinishedDate: function(){
				this.finishedDate = moment(this.createdDate).add(this.cycle, 'month').format('YYYY-MM-DD');
			},
			getYield: function(){
				this.yield = Math.round(this.principal*(0.01*this.yieldRate/12)*this.cycle);
			},
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