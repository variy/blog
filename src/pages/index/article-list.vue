<template>
		<div>
			<articleitem v-for="item in articles" :title="item.title" :tagList="item.tagList" :introduce="item.introduce" :reviewCount="item.reviewCount" :_id="item._id">
			</articleitem>
			<nav>
			  	<ul class="pagination">
				    <li @click="togglePage(curPage-1)">
				      <a href="javascript:;">
				        <span>&laquo;</span>
				      </a>
				    </li>

				    <li v-for="n in pageCount" @click="togglePage(n)" :class="{ active: curPage==n}"><a href="javascript:;">{{ n}}</a></li>
				    <li @click="togglePage(curPage+1)">
				      <a href="javascript:;">
				        <span>&raquo;</span>
				      </a>
				    </li>
			  	</ul>
			</nav>
		</div>

</template>
<script>

	var  article =  require('./article.vue');
	module.exports = {
		props: {
			articles: Array,
			pageCount: Number,
		},
		data: function(){
			return {
				curPage: Number(Global.searchObj.page || 1)
			}
		},
		components: {
			articleitem: article
		},
		methods: {
			togglePage: function(n){
				n < 1 && (n = 1);
				n > this.pageCount && (n = this.pageCount);
				location.search= '?page=' + n;
			}
		}
	}
</script>
