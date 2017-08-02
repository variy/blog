<template>
	<div class="article clearfix">
		<slot>

			<h3>{{ title}} 
				<span class="label label-default" v-for="tag in tagList">{{ tag}}</span>
			</h3>
			<p class="mrb-12">{{ introduce}}</p>
			<div>
				<a class="pull-right" href="javascript:;">评论 <span class="badge">{{ reviewCount}}</span></a>
			</div>
		</slot>

	</div>
</template>

<script>
	module.expots =  {
		props: {
			title: {
				type: String,
				// required: true
			},
			tagList: Array,
			introduce: String,
			reviewCount: Number
		},
		// data: function(){
		// 	return {
		// 		title: '',
		// 		tagList: [],
		// 		introduce: '',
		// 		reviewCount: -1
		// 	}
		// }
	}
</script>

