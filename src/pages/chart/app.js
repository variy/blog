var echarts = require('echarts');
$('#stage').height('300px')
var moment = require('moment');
var biaoge = require('./table');

var tabVue = new Vue({
    template: '<biaoge></biaoge>',
    components: {
        biaoge: biaoge
    }
});

$('body').prepend($(tabVue.$mount().$el))

        
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('stage'));
/*
  进食的基准分数 5分，超过几分 相应减分
  运动基准0分，超过加分
*/
// var data = [{
//   name: '综合得分',
//   type: 'bar',
//   data: [2, 4, 7, 3, 5, 6, 1, 6, 3, 2, 6, 3]
// }, {
//   name: '食量',
//   type: 'bar',
//   data: [2, 5, 9, 2, 2, 7, 1, 1, 4, 1, 6, 2]
// }, {
//   name: '运动量',
//   type: 'line',
//   yAxisIndex: 1,
//   data: [2, 2.2, 3.3, 4.5, 6.3, 10, 2, 2, 2, 1, 1, 6]
// }]
// var option = {
//     tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//             type: 'cross',
//             crossStyle: {
//                 color: '#999'
//             }
//         }
//     },
//     toolbox: {
//         feature: {
//             dataView: {show: true, readOnly: false},
//             magicType: {show: true, type: ['line', 'bar']},
//             restore: {show: true},
//             saveAsImage: {show: true}
//         }
//     },
//     legend: {
//         data:['综合得分','食量','运动量']
//     },
//     xAxis: [
//         {
//             type: 'category',
//             data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
//             axisPointer: {
//                 type: 'shadow'
//             }
//         }
//     ],
//     yAxis: [
//         {
//             type: 'value',
//             name: '食量',
//             min: 0,
//             max: 10,
//             interval: 1,
//             axisLabel: {
//                 formatter: '{value}'
//             }
//         },
//         {
//             type: 'value',
//             name: '运动量',
//             min: 0,
//             max: 10,
//             interval: 1,
//             axisLabel: {
//                 formatter: '{value}'
//             }
//         }
//     ],
//     series: data
// };
option = {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['食物','衣服','固定支出','玩儿','医疗健康']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'食物',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '衣服',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '固定支出',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '玩儿',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'医疗健康',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};


        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);