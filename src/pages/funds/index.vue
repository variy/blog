<template>
	<div>
		<h3>总资产：{{ total}}元</h3>
		<p>
			<a type="button" class="btn btn-primary expense-add-btn" href="./funds-edit.html">增加资产</a>
		</p>
		<div class="panel panel-default">
			<div class="panel-heading">负债: <em>{{ totalDue}}</em>元</div>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>对象</th>
						<th>总金</th>
						<th>本金</th>
						<th>利率(%)</th>
						<th>创建日期</th>
						<th>结束日期</th>
						<th>周期(月)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in dueList" @click="goFundsItem(item.genus, item._id)">
						<td>{{ item.category}}</td>
						<td>{{ item.thousEvalTotalAmont}}</td>
						<td>{{ item.principal}}</td>
						<td>{{ item.yieldRate}}</td>
						<td>{{ item.createdDate}}</td>
						<td>{{ item.finishedDate}}</td>
						<td>{{ item.cycle}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<div class="panel panel-default">
			<div class="panel-heading">资产: <em>{{ totalFunds}}</em>元</div>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>对象</th>
						<th>总金</th>
						<th>本金</th>
						<th>利率(%)</th>
						<th>创建日期</th>
						<th>结束日期</th>
						<th>周期(月)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in fundsList" @click="goFundsItem(item.genus, item._id)">
						<td>{{ item.category}}</td>
						<td>{{ item.thousEvalTotalAmont}}</td>
						<td>{{ item.principal}}</td>
						<td>{{ item.yieldRate}}</td>
						<td>{{ item.createdDate}}</td>
						<td>{{ item.finishedDate}}</td>
						<td>{{ item.cycle}}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="panel panel-default">
			<div class="panel-heading">应收欠款：<em>{{ totalReceive}}</em>元</div>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>对象</th>
						<th>总金</th>
						<th>本金</th>
						<th>利率(%)</th>
						<th>创建日期</th>
						<th>结束日期</th>
						<th>周期(月)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in receiveList" @click="goFundsItem(item.genus, item._id)">
						<td>{{ item.category}}</td>
						<td>{{ item.thousEvalTotalAmont}}</td>
						<td>{{ item.principal}}</td>
						<td>{{ item.yieldRate}}</td>
						<td>{{ item.createdDate}}</td>
						<td>{{ item.finishedDate}}</td>
						<td>{{ item.cycle}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	module.exports = {
		props: {
			list: Array
		},
		data: function(){
			return {
				dueList: [],
				fundsList: [],
				receiveList: [],
				totalFunds: ''
			};
		},
		created: function(){
			var totalFunds = 0, totalReceive = 0, totalDue = 0;
			this.dueList = this.list.filter(function(item){
				return item.genus === 'due';
			});
			this.fundsList = this.list.filter(function(item){
				return item.genus === 'funds';
			});
			this.receiveList = this.list.filter(function(item){
				return item.genus === 'receivables';
			});
			this.fundsList.forEach(function(item){
				totalFunds += Number(item.evalTotalAmont);
			});
			this.totalFunds = PowerFn.commafy(totalFunds);

			this.receiveList.forEach(function(item){
				totalReceive += Number(item.evalTotalAmont);
			});
			this.totalReceive = PowerFn.commafy(totalReceive);

			this.dueList.forEach(function(item){
				totalDue += Number(item.evalTotalAmont);
			});
			this.totalDue = PowerFn.commafy(totalDue);
			this.total = PowerFn.commafy(totalFunds + totalReceive - totalDue)
		},
		methods: {
			goFundsItem: function(genus, id){
				genus = genus || 'funds'
				location.href = './funds-edit.html?genus=' + genus+'&id=' + id;
			}
		}
	}

</script>