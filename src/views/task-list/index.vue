<template>
    <div>
        <div id="add-task-area">
            <input type="text" placeholder="添加任务">
            <button type="button">确认</button>
        </div>
        <div class="tasks-area" id="tasks-area">
            <div class="task-collection-item" v-for="item in list">
                <h3>{{ item.txt}}</h3>
                <div class="task-coll-content">
                    <tasklist :list="item.list"></tasklist>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
    var taskList = require('./task-list.vue');
    module.exports = {
        props: {
            list: Array
        },
        created: function(){
            var me = this;
            // Global.eventHub.$on('toggleType', function(type){
            //     category.toggleType(type)
            //     me.paramsChange();
                
            // });
            // 

        },
        components: {
            tasklist: taskList
        },
        methods: {
            paramsChange: function() {
                // this.collection = category.listData;
            }
        }
    }
</script>