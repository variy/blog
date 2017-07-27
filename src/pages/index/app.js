var index = require('./a.vue');
$(function(){
	Vue.component('index', index);
    new Vue({
        el: '#container',
        template: '<index></index>',
        components: {
            index: index
        }
    })
})
// alert(tpl({name: 'world'}))
// debugger;
// Zepto('<div></div>').html(tpl({name: 'world'})).appendTo('body')
// $.ajax({
// 	url: '/user/login',
// 	type: 'post',
// 	data: {
// 		username: 'adog',
// 		password: '1234'
// 	},
// 	success: function(data) {
// 		console.log(data)
// 	}
// });

// Vue