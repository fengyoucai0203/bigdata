$().ready(function () {

    $("#flights-number").click(function () {


        var start_longitude =   $("#flightpathtables").data("start_longitude");
        var end_longitude =   $("#flightpathtables").data("end_longitude");
        var start_latitude =  $("#flightpathtables").data("start_latitude");
        var end_latitude =  $("#flightpathtables").data("end_latitude");
        var start_height =  $("#flightpathtables").data("start_height");
        var end_height =  $("#flightpathtables").data("end_height");
        var starttime = $("#flightpathtables").data("starttime");
        var end_time =  $("#flightpathtables").data("end_time");



       /* var formatstarttime = starttime.replace(/-/g,'/');
        var formatendtime=end_time.replace(/-/g,'/');
        var x = [];



        $("#flightsstarttime").text(starttime+"至")
        $("#flightsend_times").text(end_time+","+"经度")
        $("#startlongitude").text(start_longitude+"~");
        $("#endlongitude").text(end_longitude+",纬度");
        $("#startlatitude").text(start_latitude+"~");
        $("#endlatitude").text(end_latitude+",海拔");
        $("#startheight").text(start_height+"~");
        $("#endheight").text(end_height+"米范围内的航班数据");*/

        drawCharts();
    })
});

function drawCharts() {

    var charts = echarts.init(document.getElementById("flightstatistics"));

    // 使用刚指定的配置项和数据显示图表。
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['航班数量']
        },
        xAxis: [
            {
                type: 'category',
                data: ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '航班数',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} 架'
                }
            }
        ],
        series: [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            }
        ]
    };
    charts.setOption(option);
}
