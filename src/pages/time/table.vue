<style>
	.panel-heading {
		position: relative;
		overflow: hidden;
	}
	.over-h {
		overflow: hidden;
	}

	.expend-decr {
		margin-top: 12px;
		text-indent: 2rem;
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

	.vertical-table-tr:hover, .vertical-table-tr.active  {
		background-color: #eee;
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
						<option value="all">所有</option>
					</select>&nbsp;&nbsp;
					<a href="./time-edit.html" class="btn btn-default btn-sm pull-right">增加</a>
				</div>
				<p class="expend-decr">
					从{{from}}起，其中:
					<ul class="vertical-table">
						<li v-for="(item, index) in sList" :class="['vertical-table-tr', {active: item.active}]" @click="filterConsume(item.type, index)">
							<p>{{item.type}}</p>
							<p>{{item.count}}</p>
						</li>
					</ul>
				</p>
				
			</div>
				<table class="table table-bordered table-condensed table-hover">
					<thead>
						<tr>
							<th>日期</th>
							<th>内容</th>
							<th>描述</th>
							<th>评分</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in result" @click="goItem(item._id)">
							<td>{{ item.date}}</td>
							<td>{{ item.tasks.join('，')}}</td>
							<td>{{ item.notes}}</td>
							<td>{{ item.marks}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</table>
	</div>

</template>
<script>
	var getList = function(arr){
		var taskList = [];
		var newArr = [], obj = {};
		arr.forEach(function(item){
			taskList = taskList.concat(item.tasks);
		});
		taskList.forEach(function(item){
			if(item in obj){
				obj[item]++;
			}else{
				obj[item] = 1;
			}
		});
		for(var attr in obj){
			newArr.push({
				type: attr,
				count: obj[attr],
				active: false
			})
		}
		newArr.sort(function(a,b){
			return a.count < b.count;
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
					url: '/time/query',
					data: {
						from: me.from,
						to: now
					}
				}).done(function(data){
					if(data.err === '0'){
						var result = data.data;
						console.log(result)
						result.map(function(item){
							var date = moment(item.date).format('YYYY-MM-DD');
							item.date = date + PowerFn.getDayFromDate(date);

							var newArr = [];
							for(var i=0; i<item.tasks.length; i++){
								newArr.push(PowerFn.parseTime(item.tasks[i]))
							}
							item.tasks = newArr;
							return item;
						});
						me.sList = getList(result);
						me.result = result;
					}
				})
			},
			goItem: function(id){
				location.href= 'time-edit.html?id=' + id;
			},
			filterConsume: function(type, i){
				if(this.filterIndex !== -1){
					this.sList[this.filterIndex].active = false;
				}
				this.filterIndex = i;
				this.sList[i].active = true;
				// Vue.set(this.sList, 0, )
			},
			delItem: function(id, e){
				
							
			}
		}
	}
</script>