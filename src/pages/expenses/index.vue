<template>
	<div>
		<div class="panel panel-default">
			<div class="panel-heading">负债: <em>211,000</em>元</div>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>借款对象</th>
						<th>类型</th>
						<th>金额</th>
						<th>归还日期</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>江苏银行</td>
						<td>银行借款</td>
						<td>160,000</td>
						<td>2018-02-20</td>
					</tr>
					<tr>
						<td>广发银行</td>
						<td>银行借款</td>
						<td>51,000</td>
						<td>等额本息，每月12号</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			<a type="button" class="btn btn-primary expense-add-btn" href="./funds-edit.html?genus=funds">增加资产</a>
		</p>
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
					<tr v-for="item in fundsList" @click="goFundsItem(item._id)">
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
			<div class="panel-heading">应收欠款：<em>48,600</em>元</div>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>欠款人</th>
						<th>金额</th>
						<th>归还日期</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>王星耀</td>
						<td>33,600</td>
						<td>未定, 1月中 要一次</td>
					</tr>
					<tr>
						<td>熊果诚</td>
						<td>15,000</td>
						<td>2017-11 月中还</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	module.exports = {
		props: {
			fundsList: Array
		},
		data: function(){
			return {
				totalFunds: ''
			};
		},
		created: function(){
			var totalFunds = 0;
			this.fundsList.forEach(function(item){
				totalFunds += Number(item.evalTotalAmont);
			});
			this.totalFunds = PowerFn.commafy(totalFunds);
		},
		methods: {
			goFundsItem: function(id){
				location.href = './funds-edit.html?genus=funds&id=' + id;
			}
		}
	}

</script>