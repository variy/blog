<tempalte>
	<articleitem v-for="item in articleList" :title="item.title" :tagList="item.tagList" :introduce="item.introduce" :reviewCount="item.reviewCount">
	</articleitem>
</tempalte>
<script>
	import articleitem from './article.vue';
	export default {
		components: {
			articleitem: articleitem
		},
		data: function(){
			return {
				articleList: [{
					title: '111',
					tagList: ['111'],
					introduce: '222',
					reviewCount: 6
				}]
			}
		}
	}
</script>
