//画折线图
 function showairechar()
    {

        var  starttime = $("#tables").data("starttime");
        var end_time    =$("#tables").data("end_time");
        var flightnumber = $("#tables").data("flightnumber");
        var formatstarttime = starttime.replace(/-/g,'/');
        var formatendtime=end_time.replace(/-/g,'/');

        var xtime={};
        var x = [];


        var days = DateDiff($("#tables").data("starttime"),$("#tables").data("end_time"));

        $("#starttime").text(starttime+"至")
        $("#end_times").text(end_time+","+"航班号")
        $("#flightnumber").text(flightnumber);



        for(var i = 0;i<= days;i++)
        {
            var datetiem=addDate(starttime, i);

            if (!xtime[datetiem]) {
                xtime[datetiem] = [];
            }

            xtime[datetiem].push(datetiem);
          //  x.push()
        }

        $.each(xtime,function (i,item)
        {
            x.push(i)

        })
        console.log(x)





        $.send("/flightanalysis/gettrack",{
            flightid: flightnumber,
            startdate: formatstarttime,
            enddate: formatendtime
        },function (data) {

            var jsonObj = eval(data);
            if(jsonObj.status == "success")
            {
             /*   var start_airport = jsonObj.data.flights[0].start_airport;
                var end_airport =  jsonObj.data.flights[0].end_airport;
                $.send("/airport/getairportinfo",{
                    airportid:start_airport
                },function (data) {

                    var jsonObj = eval(data);
                    start_airport = jsonObj.data.airport.city_cn;
                    $("#start_airport").text("("+start_airport+"--")
                });
                $.send("/airport/getairportinfo", {
                    airportid: end_airport
                }, function (data) {
                    var jsonObj = eval(data);
                    if(jsonObj.status == "success")
                    {
                        end_airport = jsonObj.data.airport.city_cn;
                        $("#end_airport").text(end_airport+")的航班数据")
                    }else
                    {
                        return false;
                    }
                });*/

                drawChart(x,jsonObj)
            }else
            {
                alert("选择的日期数据不存在！")
                return false;
            }
        })

    }

