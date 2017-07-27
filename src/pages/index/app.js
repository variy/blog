
$.ajax({
	url: '/user/login',
	type: 'post',
	data: {
		username: 'adog',
		password: '1234'
	},
	success: function(data) {
		console.log(data)
	}
});

Vue