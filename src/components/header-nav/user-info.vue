<template>
	<ul class="nav navbar-nav navbar-right" id="header-login-info">
		<template v-if="isLogin">
			<li><a  href="javascript:;">欢迎，{{ username}}</a></li>
			<li><a href="javascript:;" @click="logout">退出</a></li>
		</template>
		<template v-else>
			<li><a href="javascript:;" class="login-btn" @click="alertLogin">登录</a></li>
		</template>
	</ul>
</template>
<script>
	var loginFn = require('../../components/login-dialog');
	module.exports = {
		props: {
			isLogin: Boolean,
			username: String
		},
		methods: {
			alertLogin: function(){
				loginFn();
			},
			logout: function(){
				$.ajax({
					url: '/user/logout'
				}).done(function(data){
					if(data.err === '0'){
						location.reload();
					}
				})
			}
		}
	}
</script>