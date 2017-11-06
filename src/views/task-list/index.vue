<template>
    <div>
        <div class="tasks-area" id="tasks-area">
            <div class="task-collection-item" v-for="item in list" v-show="item.list.length > 0">
                <h3>{{ item.txt}}</h3>
                <div class="task-coll-content">
                    <tasklist :list="item.list"></tasklist>
                </div>
            </div>
        </div>
        <a type="button" class="btn btn-primary task-add-btn" href="#!task-edit/0">增加任务</a>
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