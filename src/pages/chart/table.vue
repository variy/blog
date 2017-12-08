<style>
	.panel-heading {
		position: relative;
		overflow: hidden;
	}
	.over-h {
		overflow: hidden;
	}

	.expend-decr {
		position: relative;
		margin-top: 12px;
		text-indent: 2rem;
	}
	.expend-decr > .refresh-btn {
		position: absolute;
		right: 20px;
		top: 7px;

	}
	td {
		max-width: 20%;
	}
	.vertical-table {
		margin-top: 12px;
		overflow: hidden;
	}
	.vertical-table-tr  {
		display: inline-block;
		border-left: 1px solid #ccc;
		text-align: center;
	}

	.vertical-table-tr:hover  {
		background-color: #eee;
	}
	.vertical-table-tr.active {
		background-color: #fff;
		color: #333;

	}
	.vertical-table-tr:last-child {
		border-right: 1px solid #ccc;

	}
	.vertical-table-tr > p {
		border-bottom: 1px solid #ccc;
		margin: 0;
		padding: 4px 6px;
		
	}

	.vertical-table-tr > p:first-child {
		border-top: 1px solid #ccc;
		
	}
</style>
<template>
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<div class="over-h">
					近&nbsp;<select class="form-control width-a" v-model="dateQuery">
						<option value="1">一月</option>
						<option value="3">三个月</option>
						<option value="6">六个月</option>
						<option value="12">一年</option>
						<option value="24">二年</option>
					</select>&nbsp;&nbsp;
					<!-- <a href="#" class="link">更多筛选</a>					 -->
					<a href="./expense-edit.html?genus=expend" class="btn btn-primary btn-sm pull-right">增加</a>

				</div>
				<p class="expend-decr">
						从{{from}}起，总花费：{{total}}元，其中: <a onclick="location.reload();" href="javascript:;" class="refresh-btn glyphicon glyphicon-refresh"></a>
					<ul class="vertical-table">
						<li v-for="(item, index) in sList" :class="['vertical-table-tr', {active: item.active}]" @click="filterConsume(item.type, index)">
							<p>{{item.txt}}</p>
							<p>{{item.count}}</p>
							<p>{{ item.amount}}</p>
						</li>
					</ul>
				</p>
				
			</div>
				<table class="table table-bordered table-condensed table-hover">
					<thead>
						<tr>
							<th>日期</th>
							<th>类型</th>
							<th>金额</th>
							<th>备注</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in result" @click="goItem(item._id)">
							<td>{{ item.date}}</td>
							<td>{{ item.typeTxt}}</td>
							<td>{{ item.amount}}</td>
							<td>{{ item.title}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</table>
	</div>

</template>
<script>
	var resultList = [];
	var getList = function(arr){
		var newArr = [], obj = {};
		arr.forEach(function(item){
			if(obj[item.type]){
				obj[item.type].amount += Number(item.amount);
				obj[item.type].count++;

			}else{
				obj[item.type] = {
					amount: item.amount,
					count: 1
				};

			}
		});
		for(var attr in obj){
			newArr.push({
				txt: PowerFn.parseExpense(attr),
				type: attr,
				amount: obj[attr].amount,
				count: obj[attr].count,
				active: false
			})
		}
		newArr.sort(function(a,b){
			return a.amount < b.amount;
		})
		return newArr;
	}
	var moment = require('moment');
	module.exports = {
		data: function(){
			return {
				dateQuery: Global.searchObj.dateQuery || '1',
				result: [],
				from: '',
				total: '',
				sList: [],
				filterIndex: -1
			}
		},
		created: function(){
			this.queryDate();

		},
		watch: {
			dateQuery: function(v){
				location.search = '?dateQuery=' + v;
				// this.queryDate();
			}
		},
		methods: {
			queryDate: function(){
				var me = this;
				var now = moment(new Date).add('1', 'day').format('YYYY-MM-DD');		
				this.from = moment().subtract(this.dateQuery, 'month').format('YYYY-MM-DD');

				$.ajax({
					url: '/expense/query',
					data: {
						from: me.from,
						to: now
					}
				}).done(function(data){
					if(data.err === '0'){
						var result = data.data;
						var total = 0;
						result.map(function(item){
							item.date = moment(item.date).format('YYYY-MM-DD');
							item.typeTxt = PowerFn.parseExpense(item.type);
							total += Number(item.amount);
							return item;
						});
						me.sList = getList(result);
						me.total = total;
						me.result = result;
						resultList = result.slice();
					}
				})
			},
			goItem: function(id){
				location.href= 'expense-edit.html?genus=expend&id=' + id;
			},
			filterConsume: function(type, i){
				// debugger;
				if(this.filterIndex !== -1){
					this.sList[this.filterIndex].active = false;
				}
				this.filterIndex = i;
				this.sList[i].active = true;
				// Vue.set(this.sList, 0, )
				this.result = resultList.filter(function(item){
					return item.type === type;
				});

			},
			delItem: function(id, e){
				
							
			}
		}
	}
</script>