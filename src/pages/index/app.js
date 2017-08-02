import App from './a.vue';
import ArticleList from './article-list.vue';

$(function() {
	new Vue({
		render: h => h(App)
			// template: '<settings></settings>',
			//    components: {
			//        settings: App
			//    }
	}).$mount('#app1');

	var AA = new Vue({
		render: h => h(ArticleList),

		// template: '<articles></articles>',
		// components: {
		//   articles: ArticleList
		// }
	}).$mount('#article-box');
	console.log(ArticleList.articleList)
	// Vue.set(ArticleList.articleList, 0, {
	// 	title: '111',
	// 	tagList: ['111'],
	// 	introduce: '222',
	// 	reviewCount: 6
	// })

});