<tempalte>
		<articleitem v-for="item in articleList" :title="item.title" :tagList="item.tagList" :introduce="item.introduce" :reviewCount="item.reviewCount"> {{ item.title}}
		</articleitem>
</tempalte>
<script>
	import article from './article.vue';
	var result = [{
		title: '标题1',
		tagList: ['tag'],
		introduce: '啊啊啊啊啊',
		reviewCount: 6
	}, {
		title: '111',
		tagList: ['111'],
		introduce: '222',
		reviewCount: 6
	}, {
		title: 'hasjkdhui',
		tagList: ['111'],
		introduce: '222',
		reviewCount: 6
	}];
	export default {
		// components: {
		// 	articleitem: article
		// },
		render: function(createElement){
			return createElement(article, result.map(function(item){
				return createElement(article, item)
			}))
		}
		// h => h(article),
		
	}
</script>
