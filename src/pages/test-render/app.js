$(function(){
	// Vue.component('anchored-heading', {
	//   template: '#anchored-heading-template',
	//   props: {
	//     level: {
	//       type: Number,
	//       required: true
	//     }
	//   }
	// });

	// Vue.component('anchored-heading', {
	// 	render: function(createEl){
	// 		return createEl('h' + this.level, this.$slots.default)
	// 	},
	// 	props: {
	// 		level: Number
	// 	}
	// });

	Vue.component('heading2', {
		render: function(createEl){
			if(this.items.length){
				return createEl('ul', this.items.map(function(item){
					return createEl('li', item.name)
				}))
			}else{
				return createEl('p', 'No items found');
			}
		},
		props: {
			items: Array
		}
	})

	new Vue({
		el: '#app-3',
		data: {
			items: []
		}
	})
})
	