<template>
	<table class="table table-hover">
		<thead>
			<tr>
				<th>#</th>
				<th>用户名</th>
				<th>id</th>
				<th>密码</th>
				<th>权限值</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in list">
				<td>{{ index}}</td>
				<td>{{ item.username}}</td>
				<td>{{ item._id}}</td>
				<td>{{ item.password}}</td>
				<td>{{ item.authority}}</td>
				<td>
	  				<button type="button" class="btn btn-default btn-sm">修改</button>
	  				<button type="button" class="btn btn-default btn-sm">XXX</button>
					<button type="button" class="btn btn-danger btn-sm">删除</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	module.exports = {
		props: {
			list: Array
		}
	}
</script>
