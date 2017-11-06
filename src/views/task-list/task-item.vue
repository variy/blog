<template>
    <li class="task-item">
        <input type="checkbox" :checked="done" @change="toggleDone">
        <span class="task-item-content" @click="editTask(id)">
            <span class="task-item-title">{{ title}}</span>
            <small class="task-item-date">{{ showDate}} {{ repeatTxt}}</small>
        </span>
        <i class="toright-icon">&gt;</i>
    </li>
</template>
<script>
    var repeatTxtMap = {
        'day': '天',
        'week': '周',
        'month': '月'
    };
    var moment = require('moment');
    console.log(moment().format('YYYY-MM-DD'));
    module.exports = {
        props: {
            done: Boolean,
            id: String,
            title: String,
            date: String,
            repeatType: String
        },
        data: function(){
            return {
                realDone: false,
                showDate: '',
                repeatTxt: ''
            }
        },
        watch: {
            repeatType: function(){
                if(this.repeatType !== 'none'){
                    this.repeatTxt = '每' + repeatTxtMap[this.repeatType] + '重复'
                }
            }
        },
        created: function(){
            this.realDone = this.done;
            this.showDate = moment(this.date).format('YYYY-MM-DD')
            if(this.repeatType !== 'none'){
                this.repeatTxt = '每' + repeatTxtMap[this.repeatType] + '重复'
            }
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