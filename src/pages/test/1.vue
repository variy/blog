<template>
	<h2 :msg="msg">
		{{ msg}} aaa
		<app></app>
	</h2>
</template>
<script>
	import comp from './App.vue';
	export default {
		data: function(){
			return {
				msg: '000000'
			}
		},
	  	render: function(createEl){
	  		return createEl(comp, 'app')
	  	}
	}
</script>