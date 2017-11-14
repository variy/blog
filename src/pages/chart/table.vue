<style>
	.panel-heading {
		overflow: hidden;
	}
</style>
<template>
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<select class="form-control width-a" v-model="dateQuery">
					<option value="month">近一月</option>
					<option value="week">近一周</option>
					<option value="year">近一年</option>
				</select>
				<a href="./expense-edit.html" class="btn btn-default btn-sm pull-right">增加</a>
			</div>
				<table class="table table-bordered table-condensed">
					<thead>
						<tr>
							<th>日期</th>
							<th>类型</th>
							<th>金额</th>
							<th>备注</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in list">
							<td>{{ item.date}}</td>
							<td>{{ item.type}}</td>
							<td>{{ item.amount}}</td>
							<td>{{ item.title}}</td>
							<td>
				  				<button type="button" class="btn btn-default btn-xs" @click="goItem(item._id)">修改</button>
								<button type="button" class="btn btn-danger btn-xs" @click="delItem(item._id)">删除</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</table>
	</div>

</template>
<script>
	module.exports = {
		props: {
			list: Array
		},
		data: function(){
			return {
				dateQuery: 'month'
			}
		},
		watch: {
			dateQuery: function(v){
				// location.search = '?range=' + v;
			}
		},
		methods: {
			goItem: function(id){
				location.href= 'expense-edit.html?genus=expend&id=' + id;
			},
			delItem: function(id){
				$.ajax({
					url: '/expense/del',
					type: 'delete',
					data: {
						id: id
					}
				}).done(function(data){
					if(data.err === '0'){
						alert('删除成功');
						location.reload();
					}
				})
			}
		}
	}
</script>