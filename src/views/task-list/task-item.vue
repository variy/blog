<template>
    <li class="task-item">
        <input type="checkbox" :checked="done" @change="toggleDone">
        <span class="task-item-content" @click="editTask(id)">
            <span class="task-item-title">{{ title}}</span>
            <small class="task-item-date">{{ showDate}} {{ realDone}}</small>
        </span>
        <i class="toright-icon">&gt;</i>
    </li>
</template>
<script>
    var moment = require('moment');
    console.log(moment().format('YYYY-MM-DD'));
    module.exports = {
        props: {
            done: Boolean,
            id: String,
            title: String,
            date: String
        },
        data: function(){
            return {
                realDone: false,
                showDate: ''
            }
        },
        created: function(){
            this.realDone = this.done;
            this.showDate = moment(this.date).format('YYYY-MM-DD')
        },
        methods: {
            editTask: function(id) {
                location.hash = '!task-edit/' + id;
            },
            toggleDone: function(){
                var me = this;
                Global.eventHub.$emit('toggleDone',
                    {
                        id: me.id,
                        done: !me.realDone
                    }
                );
            }
        }
    }
</script>