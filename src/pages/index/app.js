import App from './a.vue';
import ArticleList from './article-list.vue';

$(function(){
	new Vue({
	  render: h => h(App)
	  // template: '<settings></settings>',
   //    components: {
   //        settings: App
   //    }
	}).$mount('#app');

	new Vue({
		template: '<articles></articles>',
		components: {
		  articles: ArticleList
		}
	}).$mount('#article-box');
});