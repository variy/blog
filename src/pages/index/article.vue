<template>
	<div class="article clearfix">
		<h3>{{ title}} 
			<span class="label label-default" v-for="tag in tagList">{{ tag}}</span>
		</h3>
		<p class="mrb-12">{{ introduce}}</p>
		<div>
			<a class="pull-right" href="javascript:;">评论 <span class="badge">{{ reviewCount}}</span></a>
		</div>
	</div>
</template>

<script>
	module.exports =  {
		props: {
			title: {
				type: String,
				// required: true
			},
			tagList: Array,
			introduce: String,
			reviewCount: Number
		}
	}
</script>

