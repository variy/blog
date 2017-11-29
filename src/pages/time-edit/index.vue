<style>
	.form-group > div {
		margin-top: 18px;
	}
	.checkbox label {
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
			<div class="input-group col-sm-8 checkbox">
				    <label v-for="item in list">
			      		<input type="checkbox" :value="item.value">
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
				marks: ''
			}
		},
		created: function(){
			var me = this;
			this.getWeekendTip();
			if(this.id){
				$.ajax({
					url: '/funds/queryitem',
					data: {
						id: me.id
					}
				}).done(function(data){
					if(data.err === '0'){
						var result = data.data;
						var obj = {
							principal: result.principal,
							notes: result.notes, 
							category: result.category,
							cycle: result.cycle,
							yieldRate: result.yieldRate,
							createdDate: moment(result.createdDate).format('YYYY-MM-DD')
						}
						console.log(obj)
						for(var attr in obj){
							me[attr] = obj[attr];
						}

						me.thousPrincipal = PowerFn.commafy(me.principal);
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
				$.ajax({
					url: '/time/saveitem',
					data: {
						category: me.category,
						createdDate: me.createdDate,
						finishedDate: me.finishedDate,
						principal: me.principal,
						cycle: me.cycle,
						yieldRate: me.yieldRate,
						yield: me.yield,
						evalTotalAmont: me.totalAmount.replace(/,/g, ''),
						id: me.id,
						notes: me.notes
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