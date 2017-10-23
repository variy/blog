<template>
	<div v-if="!isLogin">
	    <div class="txt-c mrb-12">
	        <div class="btn-group">
	            <button type="button"class="btn btn-default" v-bind:class="{'btn-primary':tab== 0}" @click="tab='0'">登陆</button>
	            <button type="button" class="btn btn-default" v-bind:class="{'btn-primary':tab== 1}" @click="tab='1'">注册</button>
	        </div>
	    </div>
	    <div class="input-group mrb-12">
	        <span class="input-group-addon">用户名</span>
	        <input type="text" class="form-control" placeholder="用户名" v-model="username">
	    </div>
	    <div class="input-group mrb-12">
	        <span class="input-group-addon">&nbsp;密码</span>
	        <input type="password" class="form-control" placeholder="password" v-model="password">
	    </div>
	    <button type="button" class="btn btn-default pull-right" @click="submit">确定</button>
	</div>
	<div v-else>
		亲爱的{{ username}},<a href="./manager.html">进入后台管理</a>
	</div>
</template>
<script>
	module.exports = {
		name: 'app',
		props: {
			isLogin: Boolean,
			username: String
		},
		data: function(){
			return {
				tab: '0',
				password: ''
			}
		},
		created: function(){
			
		},
		methods: {
			submit: function(){
				var me = this;
				if(!this.username || !this.password){
					alert('请输入用户名和密码！')
					return;
				}

				switch(this.tab){
					case '0':
					$.ajax({
						url: Global.reqDomain +'/user/login',
						type: 'get',
						data: {
							username: me.username,
							password: me.password
						},
						success: function(data) {
							if(data.err === '0'){
								alert('login success');
								window.location.reload();
							}else{
								alert(data.msg)
							}
						}
					});
					break;

					case '1':
					$.ajax({
						url: Global.reqDomain + '/user/register',
						type: 'post',
						data: {
							username: me.username,
							password: me.password
						},
						success: function(data) {
							if(data.err === '0'){
								alert('register success');
							}else{
								alert(data.msg)
							}
						}
					});
					break;

				}
					
			}
		}
	}
</script>