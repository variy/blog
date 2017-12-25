<style>
	.form-group > div {
		margin-top: 18px;
	}
	.checkbox-list button {
		display: block;
		float: left;
		margin: 0 12px 14px 0;
	}
	.btn-info-light {
		background-color: #c8f1fd;
		border-color: #a1dbec;
		color: #fff;
	}
	.btn-info-light .badge {
	    color: #5bc0de;
	    background-color: #fff;
	}
	.btn-left-attach {
	    float: left;
	    width: 18px;
	    line-height: 34px;
	    font-weight: bold;
	    /* padding: 2px; */
	    height: 100%;
	    border-radius: 4px 0 0 4px;
	    background-color: #488192;
	    /*border: 1px solid #488192;*/
	}
	.btn-right-attach {
		float: right;
		height: 100%;
		padding: 6px 10px;
	}
	.tag-btn {
		padding: 0;
		height: 34px;
	}

</style>
<template>
	<div class="form-horizonta">	
		<div class="form-group">
			<div class="input-group date form_datetime col-sm-4">
				<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
			    <input class="form-control task-edit-date-input" size="16" v-model="createdDate" type="text">
			</div>{{ weekendTip}}
			<div class="input-group col-sm-8 checkbox-list">
				  <!--   <label v-for="item in taskList">
			      		<input type="checkbox" :value="item.value" :checked="item.checked">
			      		<span :class="['glyphicon', 'glyphicon-' + item.icon]"></span> {{ item.txt}}
				    </label> -->

			      	<button v-for="(item, index) in taskList" :class="['btn tag-btn pos-r  padl-25 clearfix', item.count ?'btn-info' : 'btn-default']">
			      		<span class="btn-left-attach" v-show="item.count" @click="--item.count">-</span>
			      		<span class="btn-right-attach" @click="++item.count">
			      			{{ item.txt}} 
				      		<span class="badge badge-sm">{{ item.count || '+'}}</span>
				      	</span>
			      		
			      		

			      	</button>

			</div>
				<!-- <span class="input-group-addon">描述</span>
				<input type="text" class="form-control" v-model="notes">
			</div> -->
			<div class="input-group col-sm-6">
				<span class="input-group-addon">描述</span>
				<textarea class="form-control" placeholder="描述" v-model="notes"></textarea>
			</div>
			<div class="input-group col-sm-4">
				<span class="input-group-addon">评分</span>
				<input type="number" class="form-control" v-model="marks">
			</div>
			<div class="btn-group">
				<button type="button" class="btn btn-primary task-save-btn" @click="submit">保存</button>
				<button v-if="!!id" type="button" class="btn btn-default task-save-btn" @click="delTask(id)">删除</button>
			</div>
		</div>
	</div>
</template>
<script>
	var moment = require('moment');
	module.exports = {
		props: {
			list: Array
		},
		data: function(){
			return {
				id: Global.searchObj.id || '',
				notes: '', 
				createdDate: '',
				weekendTip: '',
				marks: '',
				taskList: []
			}
		},
		created: function(){
			var me = this;
			this.getWeekendTip();

			
			if(this.id){
				$.ajax({
					url: '/diet/queryitem',
					data: {
						id: me.id
					}
				}).done(function(data){
					if(data.err === '0'){
						var result = data.data;
						var obj = {
							notes: result.notes, 
							createdDate: moment(result.date).format('YYYY-MM-DD') + ' ' + PowerFn.getDayFromDate(result.date),
							marks: result.marks
						}
						console.log(obj)
						for(var attr in obj){
							me[attr] = obj[attr];
						}
						var activeArr = [],staticTaskList = [];
						var dietMap = _.extend(Global.locals.dietMap);
						var tasks = result.list;;
						tasks.forEach(function(item){
							if(item.value in dietMap){
								item.txt = dietMap[item.value];
								activeArr.push(item);
								delete dietMap[item.value];
							}
						});
						for(var attr in dietMap){
							staticTaskList.push({
								value: attr,
								txt: dietMap[attr],
								count: 0
							});
						}
														
						me.taskList = activeArr.concat(staticTaskList);
						console.log(JSON.stringify(me.taskList))
					}


				})
			}else{
				var date = moment(new Date).subtract('day', 1);
				var dayStr =  date.day() === 0 ? '日' : numUpperMap[day];
				this.createdDate = date.format('YYYY-MM-DD') + ' 周' + dayStr;;

				me.taskList = me.list.map(function(item){
					item.count = item.count || 0;
					return item;
				});
			}
		},
		mounted: function(){
			var me = this;
			$('.form_datetime').datetimepicker({
    	        language:  'zh-CN',
    	        format: 'yyyy-mm-dd',
    	        weekStart: 1,
    	        todayBtn:  1,
    			autoclose: 1,
    			todayHighlight: 1,
    			startView: 2,
    			forceParse: 0,
    	        minView: 2
    	        // showMeridian: 1
    	    }).on('changeDate', function(e){
    	    	var date = moment(e.date).format('YYYY-MM-DD');
    	    	var day = PowerFn.getDayFromDate(e.date);
    	    	me.createdDate = date + ' ' + day;;

    	    });
    	    $('body').on('click', '.tag-btn', function(){
				$(this).find('.badge').addClass('animated fadeInDown');
    	    });
    	    $('body').on('animationend', '.badge',function(){
				$(this).removeClass('animated fadeInDown');
			});
		},
		watch: {
			createdDate: function(){
				this.getWeekendTip();
			},
			taskList: function(){
			}
		},
		methods: {
			getWeekendTip: function(){
				var day = moment(this.createdDate).day();
				if(day === 6){
					this.weekendTip = '周六';
				}else if(day === 0){
					this.weekendTip = '周日'
				}else{
					this.weekendTip = '';

				}
			},
			delTask: function(id){
				$.ajax({
					type: 'delete',
					url: '/diet/del',
					data: {
						id: id
					}
				}).done(function(data){
					if(data.err === '0'){
						alert('删除成功');
						location.hash='';
					}
				})
			},
			submit: function(){
				var me = this;
				var taskList = [];
				this.taskList.forEach(function(item){
					if(item.count > 0){
						taskList.push({
							value: item.value,
							count: item.count
						})
					}
				});
				$.ajax({
					url: '/diet/saveitem',
					data: {
						date: me.createdDate,
						id: me.id,
						notes: me.notes,
						list: taskList,
						marks: me.marks
					}
				}).done(function(data){
					if(data.err === '0'){
						alert('保存成功');
						history.go('-1');
					}else{
						alert(data.msg);
					}
				})
			}
		}
	};
</script>