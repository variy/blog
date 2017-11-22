<template>
	<div>
		<div class="panel panel-default">
			<div class="panel-heading">负债: <em>274,000</em>元</div>
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
						<td>114,000</td>
						<td>等额本息，每月12号</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			<a type="button" class="btn btn-primary expense-add-btn" href="./expense-edit.html?genus=funds">增加资产</a>
		</p>
		<div class="panel panel-default">
			<div class="panel-heading">资产: <em>213,500</em>元</div>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>对象</th>
						<th>类型</th>
						<th>金额</th>
						<th>周期</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in fundsList" @click="goFundsItem(item._id)">
						<td>{{ item.target}}</td>
						<td>{{ item.principal}}</td>
						<td>{{ item.createdDate}}</td>
						<td>{{ item.principal}}</td>
					</tr>
					<tr>
						<td>团贷网</td>
						<td>p2p</td>
						<td>185,000</td>
						<td>周期长</td>
					</tr>
					<tr>
						<td>蚂蚁聚宝</td>
						<td>基金</td>
						<td>25,000</td>
						<td>周期较长</td>
					</tr>
					<tr>
						<td>灵活资金</td>
						<td>余额宝或现金</td>
						<td>3500</td>
						<td>无</td>
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
			return {};
		},
		created: function(){

		},
		methods: {
			goFundsItem: function(id){
				location.href = './expense-edit.html?genus=funds&id=' + id;
			}
		}
	}

</script>