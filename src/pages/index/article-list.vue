<tempalte>
	<articleitem v-for="item in articleList" :title="item.title" :tagList="item.tagList" :introduce="item.introduce" :reviewCount="item.reviewCount"> {{ item.title}}
	</articleitem>
</tempalte>
<script>
	import article from './article.vue';
	export default {
		// components: {
		// 	articleitem: article
		// },
		render: h => h(article),
		data: function(){
			return {
				articleList: [{
					title: '111',
					tagList: ['111'],
					introduce: '222',
					reviewCount: 6
				}, {
					title: '111',
					tagList: ['111'],
					introduce: '222',
					reviewCount: 6
				}, {
					title: '111',
					tagList: ['111'],
					introduce: '222',
					reviewCount: 6
				}]
			}
		}
	}
</script>
