<template>
	<section>
		<h2>{{ title}}</h2>
		<p>			
			<span class="label label-default" v-for="tag in tagList">{{ tag}}</span>
		</p>
		<p>{{ time}}</p>
		<div>
			{{ content}}
		</div>
	</section>
</template>
<script>
	module.exports = {
		props: {
			title: String,
			tagList: Array,
			time: String,
			content: String
		}
	}
</script>