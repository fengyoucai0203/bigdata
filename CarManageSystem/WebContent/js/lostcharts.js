
        function showlostchar() {

            var starttime = $("#tables").data("starttime");
            var end_time = $("#tables").data("end_time");
            var flightnumber = $("#tables").data("flightnumber");
            var formatstarttime = starttime.replace(/-/g, '/');
            var formatendtime = end_time.replace(/-/g, '/');

            $("#loststarttime").text(starttime + "至")
            $("#lostend_times").text(end_time + "," + "航班号")
            $("#lostflightnumber").text(flightnumber);


            $.send("/flightanalysis/gettrack", {
                flightid: flightnumber,
                startdate: formatstarttime,
                enddate: formatendtime
            }, function (data) {
                var jsonObj = eval(data);
                console.log(jsonObj.status)
                if (jsonObj.status == "success") {
                    var start_airport = jsonObj.data.flights[0].start_airport;
                    var end_airport = jsonObj.data.flights[0].end_airport;
                    $.send("/airport/getairportinfo", {
                        airportid: start_airport
                    }, function (data) {

                        var jsonObj = eval(data);
                        console.log(jsonObj.data.airport.city_cn);
                        start_airport = jsonObj.data.airport.city_cn;
                        $("#loststart_airport").text("(" + start_airport + "--")
                    });
                    $.send("/airport/getairportinfo", {
                        airportid: end_airport
                    }, function (data) {
                        var jsonObj = eval(data);
                        if (jsonObj.status == "success") {
                            end_airport = jsonObj.data.airport.city_cn;
                            $("#lostend_airport").text(end_airport + ")的航班数据")
                        } else {
                            return false;
                        }
                    });
                } else {
                    alert("选择的日期数据不存在！")
                    return false;
                }
            })


            $.send("/flightanalysis/getlosttrackratio", {
                flightid: flightnumber,
                startdate: formatstarttime,
                enddate: formatendtime
            }, function (data) {
                var jsonObj = eval(data);
                if (jsonObj.status == "success") {
                    lostdrawChart(jsonObj)
                } else {
                    setTimeout('$("#easyui-linkbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
                    alert("选择的日期数据不存在！")
                    return false;
                }
            })
        }

/*function lostdrawChart(param) {
    var loststartdata = param.data.startdate;
    var lostenddata = param.data.enddate;


    var losttrackratio = param.data.losttrackratio;
    var losttracks=[];
    for(var i =0;i<losttrackratio.length;i++)
    {
        losttracks.push(losttrackratio[i]*100)
    }
    var x = [];
    var days = DateDiff(loststartdata.replace(/\//g,"-"),lostenddata.replace(/\//g,"-"));
    for(var i = 0;i<= days;i++)
    {
        x.push(addDate(loststartdata, i))
    }

    var charts = echarts.init(document.getElementById("loststatistics"));
    // 使用刚指定的配置项和数据显示图表。
    option = {
        title: {
            text: '失跟率'
        },
        tooltip: {
            trigger: 'axis'
        },
        color:['#3420ff'],
        legend: {
            data:['失跟率']
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: x
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}  %'
            }
        },
        series: [
            {
                name:'失跟率',
                type:'line',
                data:losttracks,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
    charts.setOption(option);
}*/

//计算天数差的函数
function  DateDiff(starttime,  end_time){
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  starttime.split("-")
    oDate1 = new Date(aDate[0] , aDate[1] ,aDate[2]) //转换为12-18-2006格式
    aDate = end_time.split("-")
    oDate2 = new Date(aDate[0] , aDate[1] , aDate[2])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}
//日期加1
function addDate(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var m=d.getMonth()+1;
    var CurrentDate = "";
    CurrentDate += d.getFullYear() + "/";
    if(m >= 10)
    {
        CurrentDate += m + "/";
    }else
    {
        CurrentDate += "0" + m + "/";
    }

    if (d.getDate() >= 10 )
    {
        CurrentDate += d.getDate() ;
    }
    else
    {
        CurrentDate += "0" + d.getDate() ;
    }
    return CurrentDate;
}
