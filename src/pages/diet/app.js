var biaoge = require('./table');

var tabVue = new Vue({
    template: '<biaoge></biaoge>',
    components: {
        biaoge: biaoge
    }
});

$('body').prepend($(tabVue.$mount().$el))