<style>
	.log-item-wrapper {
		margin-bottom: 16px;
	}
	.log-item {
		border: 1px solid #ccc;
		border-radius: 4px 6px;
		padding: 6px 9px;
	}
</style>
<template>
	<section>
		<div class="container">
		<a class="btn btn-primary" href="./log-edit.html">zengjia</a>
			<div class="row">
				<article v-for="item in list" class="col-sm-4 col-md-3 log-item-wrapper">
					<div class="log-item" @click="goLog(item._id)">
						<h3>{{ item.title}}</h3>
						<p>			
							<span class="label label-default" v-for="tag in item.tagList">{{ tag}}</span>
						</p>
						<p>{{ item.date}}</p>
						<div>
							{{ item.content}}
						</div>
					</div>
				</article>
			</div>
		</div>
	</section>
</template>
<script>
	module.exports = {
		props: {
			list: Array
		},
		methods: {
			goLog: function(id){
				location.href = './log-edit.html?id=' + id;
			}
		}
	}
</script>