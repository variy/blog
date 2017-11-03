module.exports = {
    pastDue: {
        txt: '已过期',
        _filter: function(list) {
            return list.filter(function(item) {
                if(!item.date)return false;
                var now = new Date();
                var then = new Date(item.date);
                var isBefore = then.getTime() < now.getTime();
                var isNotToday = then.toDateString() != now.toDateString();
                return !item.done && (isBefore && isNotToday);
            });
        }
    },
    today: {
        txt: '今天',
        _filter: function(list) {
            return list.filter(function(item) {
                return !item.done && (new Date(item.date).toDateString() === new Date().toDateString());
            });
        }
    },
    tomorrow: {
        txt: '明天',
        _filter: function(list) {
            return list.filter(function(item) {
                if(!item.date)return false;
                var now  = new Date();
                now.setDate(now.getDate() + 1);
                var tomString = now.toDateString();
                return !item.done && (new Date(item.date).toDateString() === tomString);
            });
        }
    },
    // lastDay7: {
    //     txt: ' 接下来7天'
    // },
    last: {
        txt: '更远以后',
        _filter: function(list){
            return list.filter(function(item) {
                if(!item.date)return false;
                var now  = new Date();
                now.setDate(now.getDate() + 1);
                var tomString = now.getTime();
                return !item.done && (new Date(item.date).getTime() > tomString);
            });
        }
    },
    noDate: {
        txt: '无日期',
        _filter: function(list) {
            return list.filter(function(item) {
                return !item.date && !item.done;
            });
        }
    },
    hasDone: {
        txt: '已完成',
        _filter: function(list) {
            return list.filter(function(item) {
                return item.done;
            });
        }
    }
};