<template>
    <ul class="task-list">
        <task v-for="(task, index) in list" :id="task._id" :date="task.date" :title="task.title" :done="task.done" :index="index" :repeatType="task.repeatType"></task>
    </ul>
</template>
<script>
    var taskComp = require('./task-item.vue');
    module.exports = {
        props: {
            list: Array
        },
        components: {
            task: taskComp
        }
    };
</script>