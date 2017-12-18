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
				<select class="form-control width-a" id="repeat-type-select" v-model="category">
					<option  v-for="item in categories" :value="item.value">{{ item.txt}}</option>
				</select>
				<button class="btn btn-default btn-xs" disabled type="button">类型编辑</button>
			</div>
			<div class="input-group date form_datetime col-sm-4" data-model="createdDate">
				<span class="input-group-addon">借款&nbsp;<span class="glyphicon glyphicon-calendar"></span></span>
			    <input class="form-control task-edit-date-input" v-model="createdDate" type="text">
			</div>
			<div class="input-group date form_datetime col-sm-4"  data-model="firstRepayDate">
				<span class="input-group-addon">首次还款&nbsp;<span class="glyphicon glyphicon-calendar"></span></span>
			    <input class="form-control" type="text" v-model="firstRepayDate">
			</div>
			<div class="clearfix">
				<div class="input-group col-xs-4 pull-left mrr-10">
					<span class="input-group-addon">本金</span>
					<input class="form-control" :value="thousPrincipal" type="text" @keyup="commafy">
				</div>
				<select class="form-control width-a pull-left" v-model="repayType">
					<option  v-for="item in loanModelList" :value="item.value">{{ item.txt}}</option>
				</select>
			</div>
			<div class="clearfix">
				<div class="input-group pull-left col-xs-3 mrr-10">
					<span class="input-group-addon">周期(月)</span>
					<input type="number" class="form-control" v-model="cycle">
				</div>
				<p class="pull-left" style="line-height: 30px;">{{ finishedDate}}到期</p>
			</div>
			<div class="input-group">
				<span>年收益率: &nbsp;{{yieldRate}}%</span>
				<input class="inline-b mrl-10" v-model="yieldRate" style="width: 180px;"  type="range" step="1" min="0" max="15">
			</div>
			<div>
				预计：<span v-if="showPerMonth">每月付款 {{ perMonthNum}}，</span>
				总收{{totalAmount}}元，收益{{ yield}}元
			</div>
			<div class="input-group col-sm-4">
				<span class="input-group-addon">备注</span>
				<input type="text" class="form-control" v-model="notes">
			</div>

			<div class="btn-group">
				<button type="button" class="btn btn-primary task-save-btn" @click="submit">保存</button>
				<button v-if="!!id" type="button" class="btn btn-default task-save-btn" @click="delTask(id)">删除</button>
			</div>
		</div>
	</div>
</template>
<script>
var aa = PowerFn.getDEBX_perMonth(50000, 9, 36);
	var moment = require('moment');
	module.exports = {
		props: {
			allList: Object,
			bigCategories: Array,
			loanModelList: Array
		},
		data: function(){
			return {
				bigC: Global.searchObj.genus || 'funds',
				genus: Global.searchObj.genus,
				id: Global.searchObj.id || '',
				principal: '',
				categories: [],
				notes: '', 
				category: '',
				cycle: 1,
				yieldRate: 8,
				createdDate: moment(new Date).format('YYYY-MM-DD'),
				firstRepayDate: '',
				repayType: 'daoqibenxi',
				finishedDate: '',
				totalAmount: '',
				thousPrincipal: '',
				loanModel: 'daoqibenxi',
				showPerMonth: false
			}
		},
		created: function(){
			var me = this;
			this.categories = this.allList[this.bigC];
			this.getFinishedDate();
			this.getYield();
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
							repayType: result.repayType,
							notes: result.notes, 
							category: result.category,
							cycle: result.cycle,
							yieldRate: result.yieldRate,
							createdDate: moment(result.createdDate).format('YYYY-MM-DD'),
							firstRepayDate: result.firstRepayDate? moment(result.firstRepayDate).format('YYYY-MM-DD'): ''
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
    	    	var model = $(e.target).data('model');
    	    	var date = moment(e.date).format('YYYY-MM-DD')
    	    	me[model] = date;

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
			},
			repayType: function(v){
				this.getYield();
			}
		},
		methods: {
			commafy: function(e){
				var v = e.target.value;
				v = Number(v.replace(/,/g, ''));
				this.principal = v;
				this.thousPrincipal = PowerFn.commafy(this.principal);
			},
			getFinishedDate: function(){
				if(this.firstRepayDate){
					this.finishedDate = moment(this.firstRepayDate).add(this.cycle - 1, 'month').format('YYYY-MM-DD');
				}else{
					this.finishedDate = moment(this.createdDate).add(this.cycle, 'month').format('YYYY-MM-DD');
				}
			},
			getYield: function(){
				if(this.repayType === 'daoqibenxi'){
					this.showPerMonth = false;

					var totalRate = Math.pow(1 + 0.01*this.yieldRate, this.cycle/12);

					this.yield = Math.round(this.principal*(totalRate-1));
					this.totalAmount = PowerFn.commafy(Number(this.yield) + Number(this.principal));
				}else if(this.repayType === 'dengebenxi'){
					this.showPerMonth = true;
					this.perMonthNum = PowerFn.getDEBX_perMonth(this.principal, this.yieldRate, this.cycle);
					this.totalAmount = this.perMonthNum * this.cycle;
					this.yield = this.totalAmount - this.principal;
				}
				
			},
			delTask: function(id){
				$.ajax({
					type: 'delete',
					url: '/funds/del',
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
					url: '/funds/saveitem',
					data: {
						genus: me.bigC,
						category: me.category,
						createdDate: me.createdDate,
						firstRepayDate: me.firstRepayDate,
						finishedDate: me.finishedDate,
						repayType: me.repayType,
						principal: me.principal,
						cycle: me.cycle,
						yieldRate: me.yieldRate,
						yield: me.yield,
						evalTotalAmont: (me.totalAmount + '').replace(/,/g, ''),
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