<template>
	<div>
	    <h1 v-bind:class="{'a': tab==0}">hahaha</h1>
	    <div class="txt-c mrb-12">
	        <div class="btn-group">
	            <button type="button"class="btn btn-default" v-bind:class="{'btn-primary':tab== 0}" @click="tab=0">登陆</button>
	            <button type="button" class="btn btn-default" v-bind:class="{'btn-primary':tab== 1}" @click="tab=1">注册</button>
	        </div>
	    </div>
	    <div class="input-group mrb-12">
	        <span class="input-group-addon">用户名</span>
	        <input type="text" class="form-control" placeholder="Username">
	    </div>
	    <div class="input-group mrb-12">
	        <span class="input-group-addon">&nbsp;密码</span>
	        <input type="password" class="form-control" placeholder="password">
	    </div>
	    <button type="button" class="btn btn-default pull-right">确定</button>
	</div>
</template>
<script>
	module.exports = {
		data: function(){
			return {
				tab: 0
			}
		}
	}
</script>