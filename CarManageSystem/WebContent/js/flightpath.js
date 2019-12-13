$().ready(function () {

    var flight_count = 0;
    var flight_time = 0;


    var marks = {};
    /*搜索事件*/
    $("#flightbutton").click(function() {


        marks={};
        $("#flight_check").empty();

        $("#flightpathtables").data("rows","");
        cleanmap();
        //开始经度
        var start_longitude = $('#flightstart_longitude').searchbox('getValue').trim()
        //结束经度
        var end_longitude = $('#flightend_longitude').searchbox('getValue').trim();
        //开始纬度
        var start_latitude = $('#flightstart_latitude').searchbox('getValue').trim();
        //结束纬度
        var end_latitude = $('#flightend_latitude').searchbox('getValue').trim();
        //开始高度
        var start_height = $('#start_height').searchbox('getValue').trim();
        //结束高度
        var end_height = $('#end_height').searchbox('getValue').trim();
        //开始日期
        var starttime=$('#start_time').datebox('getValue');
        var formatstarttime = starttime.replace(/-/g,'');

        var mode;
        var r=document.getElementsByName("region");
        for(var i=0;i<r.length;i++){
            if(r[i].checked){
                mode = "part";

                //alert(r[i].value+","+r[i].nextSibling.nodeValue);
            }else
            {
                mode="all ";
            }
        }
        console.log(mode)

        //经纬度Check
        if (start_longitude != "")  {
            if (!isNumeric(start_longitude)) {
                alert("开始经度不正确，请输入数值类型的字符");
                return false;
            } else if (parseFloat(start_longitude) <= -180 || parseFloat(start_longitude) >= 180) {
                alert("开始经度范围不正确，请输入-180到180之前的数值");
                return false;
            }
        }
        if (end_longitude != "")  {
            if (!isNumeric(end_longitude)) {
                alert("结束经度不正确，请输入数值类型的字符");
                return false;
            } else if (parseFloat(end_longitude) <= -180 || parseFloat(end_longitude) >= 180) {
                alert("结束经度范围不正确，请输入-180到180之前的数值");
                return false;
            }
        }

        if (start_longitude != "" && end_longitude != "") {
            if (parseFloat(start_longitude) > parseFloat(end_longitude)) {
                alert("开始经度不能大于结束经度")
                return false;
            }
        }


        if (start_latitude != "")  {
            if (!isNumeric(start_latitude)) {
                alert("开始纬度不正确，请输入数值类型的字符");
                return false;
            } else if (parseFloat(start_latitude) <= -90 || parseFloat(start_latitude) >= 90) {
                alert("开始纬度范围不正确，请输入-90到90之前的数值");
                return false;
            }
        }
        if (end_latitude != "")  {
            if (!isNumeric(end_latitude)) {
                alert("结束纬度不正确，请输入数值类型的字符");
                return false;
            } else if (parseFloat(end_latitude) <= -90 || parseFloat(end_latitude) >= 90) {
                alert("结束纬度范围不正确，请输入-90到90之前的数值");
                return false;
            }
        }

        if (start_latitude != "" && end_latitude != "") {
            if (parseFloat(start_latitude) > parseFloat(end_latitude)) {
                alert("开始纬度不能大于结束纬度")
                return false;
            }
        }

        if(start_height != "")
        {
            if (!isNumeric(start_height)) {
                alert("高度必须为数值类型，请输入数值类型的字符");
                return false;
            }
        }
        if(end_height != "")
        {
            if (!isNumeric(end_height)) {
                alert("高度必须为数值类型，请输入数值类型的字符");
                return false;
            }
        }

        if (start_height != "" && end_height != "") {
            if (parseFloat(start_height) > parseFloat(end_height)) {
                alert("开始高度不能大于结束高度")
                return false;
            }
        }


        $("#flightpathtables").data("start_longitude",start_longitude);
        $("#flightpathtables").data("end_longitude",end_longitude);
        $("#flightpathtables").data("start_latitude",start_latitude);
        $("#flightpathtables").data("end_latitude",end_latitude);
        $("#flightpathtables").data("start_height",start_height);
        $("#flightpathtables").data("end_height",end_height);
        $("#flightpathtables").data("starttime",starttime);

        if(starttime.replace(/(^s*)|(s*$)/g, "").length ==0)
        {
            alert("请输入时间！");
            setTimeout('$("#flightbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
            return false;
        }
        //日期格式校验
        var a = /^(\d{4})-(\d{2})-(\d{2})$/;
        if(!a.test(starttime))
        {
            alert("请输入正确的日期格式！");
            setTimeout('$("#easyui-linkbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
            return false;
        }

        var regions ={};

        if(start_latitude !="" && end_latitude != "" )
        {
            regions.latitude=start_latitude+","+end_latitude;
        }
        if(start_longitude !="" && end_longitude !="")
        {
           regions.longitude=start_longitude+","+end_longitude;
        }

        if(start_height !="" && end_height !="")
        {
            regions.altitude=start_height+","+end_height;
        }

        var obj=JSON.stringify(regions); //将JSON对象转化为JSON字符

        showrectangle(start_longitude,start_latitude,end_longitude,end_latitude);
        //用于存储地图上的航班点

        $.send("/regionanalysis/gettrack",{
            date: formatstarttime,
            region: obj,
            mode:mode
        },function (data){

            var jsonObj = eval(data);
            if(jsonObj.status == "success")
            {
                var optionstring = "";
                var shareoptionstring="";
                /*表格使用*/
                var data = {"total": 0, "rows": []};
                var flightnumber=[];
                var flightnumber1=[];

                $.each(jsonObj.data.flights, function (i, flight) {


                    var flightnum = flight.flight1;

                    console.log(flightnum);

                    //将航班信息保存
                    if (!marks[flightnum]) {
                        marks[flightnum] = [];
                    }


                    if(flight.flight1 != "")
                    {
                        flight_count++;
                        flightnumber.push(flight.flight1)
                    }

                    if(flight.flight2 != "")
                    {
                        flightnumber1.push(flight.flight2)
                    }

                    //统计数据
                    if (flight.track.length > 0) {
                        var date = flight.track[0].ftime;
                        var t1 = new Date(date);

                        var date2 = flight.track[flight.track.length - 1].ftime;
                        var t2 = new Date(date2)
                        flight_time += (t2.getTime() - t1.getTime())
                    }

                    data['total'] = data['total'] + flight.track.length;

                    $.each(flight.track, function (i, track){
                        for (key in flight) {

                            if (key != 'track') {
                                track[key] = flight[key];
                            }
                        }
                        data.rows.push(track);
                    })
                });



                $.each(flightnumber.sort(),function (i,item) {

                    optionstring += "<option value=\""+item+"\" >"+item + "</option>";

                })

                $.each(flightnumber1.sort(),function (i,item) {
                    shareoptionstring +=  "<option value=\""+item+"\" >"+item + "</option>";
                })

                //添加option
                $("#airnumber").html("<option value='请选择'>请选择</option> "+optionstring);
                $("#sharenumber").html("<option value='请选择'>请选择</option> "+shareoptionstring);

                var arry=[];
                if ($("#flightpathtables").data("rows")) {
                    arry = $("#flightpathtables").data("rows");
                }
                $("#flightpathtables").data("rows",$.merge(arry,data.rows));
                $("#flightpathdg").datagrid({
                    loadMsg: '数据正在加载,请耐心的等待...',
                    loadFilter: pagerFilter,
                    pageSize: 100,
                    pageList: [100, 200,500],
                    columns: [[
                        {field: 'flight1', title: '航班号', width: 100, align: "center"},
                        {field: 'ftime', title: '时间', width: 100, align: "center", sortable: true},
                        {field: 'flight2', title: '共享航班号', width: 100, align: "center"},
                        {field: 'longitude', title: '经度', width: 100, align: "center"},
                        {field: 'latitude', title: '纬度', width: 100, align: 'center'},
                        {field: 'altitude', title: '海拔(英尺)', width: 100, align: "center"},
                        {field: 'speed', title: '速度(节)', width: 100, align: "center"}
                    ]]
                });
                $("#flightpathdg").datagrid("loadData", $("#flightpathtables").data("rows"));  //动态取数据


                /*地图打点使用*/
                if (document.createElement('canvas').getContext) {
                    /*颜色定义*/
                    var colour;
                    var countnum = 0;
                    var array = [];
                    for (var j = 0; j < jsonObj.data.flights.length; j++){


                        var flightnum = jsonObj.data.flights[j].flight1;
                        //将航班信息保存
                        if (!marks[flightnum]) {
                            marks[flightnum] = [];
                        }

                        var flights1 = jsonObj.data.flights[j].flight1;
                        var flights2 = jsonObj.data.flights[j].flight2;
                        var start_city_cn = jsonObj.data.flights[j].start_city_cn;
                        var start_country_cn = jsonObj.data.flights[j].start_country_cn;
                        var start_name_en = jsonObj.data.flights[j].start_name_en;
                        var end_city_cn = jsonObj.data.flights[j].end_city_cn;
                        var end_country_cn = jsonObj.data.flights[j].end_country_cn;
                        var end_name_en = jsonObj.data.flights[j].end_name_en;
                        countnum = countnum + jsonObj.data.flights[j].track.length;
                        var points = [];

                        var message={};
                        var message1={};

                        $.each(jsonObj.data.flights[j].track, function (i, item){

                            points.push(new BMap.Point(item.longitude, item.latitude));

                            if(i== 1)
                            {
                                message.flights1=flights1;
                                message.flights2=flights2;
                                message.ftime=item.ftime;
                                message.latitude=item.latitude;
                                message.longitude=item.longitude;
                                message.altitude=item.altitude;
                                message.speed=item.speed;
                                message.start_city_cn = start_city_cn;
                                message.start_country_cn = start_country_cn;
                                message.start_name_en = start_name_en;
                                message.end_city_cn = end_city_cn;
                                message.end_country_cn = end_country_cn;
                                message.end_name_en = end_name_en;
                            }
                            if(i==  jsonObj.data.flights[j].track.length-1)
                            {
                                message1.flights1=flights1;
                                message1.flights2=flights2;
                                message1.ftime=item.ftime;
                                message1.latitude=item.latitude;
                                message1.longitude=item.longitude;
                                message1.altitude=item.altitude;
                                message1.speed=item.speed;
                                message1.start_city_cn = start_city_cn;
                                message1.start_country_cn = start_country_cn;
                                message1.start_name_en = start_name_en;
                                message1.end_city_cn = end_city_cn;
                                message1.end_country_cn = end_country_cn;
                                message1.end_name_en = end_name_en;
                            }


                        })



                        var color = COLOUR[j % COLOUR.length];

                        var options = {
                            size: BMAP_POINT_SIZE_SMALL,
                            shape: BMAP_POINT_SHAPE_STAR,
                            color: color
                        }

                        showflightpathMap(points, options,marks[flightnum],message,message1)
                    }
                    //生成航班号Checkbox信息
                    var flightnumber=[];
                    $.each(marks, function (key, value) {

                        if( key != "")
                        {
                            flightnumber.push(key)
                        }
                    });

                    $.each(flightnumber.sort(),function (i,item) {

                        $("#flight_check").append("<input type='checkbox' checked value='"+ item +"'/>"+item + "<br />");

                    })




                    setTimeout('$("#easyui-linkbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
                    console.log("航迹分析成功!")

                }else {
                    setTimeout('$("#easyui-linkbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
                    alert('请在chrome、safari、IE8+以上浏览器查看');
                }

                //显示总计和飞行时长
                $("#flight_count").text(flight_count + " 班次");
                $("#flight_time").text(parseInt(flight_time / (1000 * 60 )) + " 分钟(" + parseInt(flight_time / (1000 * 60 * 60)) + "小时)");

                //绑定选择事件,如果选中则显示这个国家的信标，否则隐藏这个国家的信标
                $("#flight_check").find(":checkbox").click(function () {

                    var check_len = $("#flight_check").find(":checkbox").length;

                    var flight = $(this).val();
                    if ($(this).attr("checked") == "checked") {
                        if (check_len == $("#flight_check").find(":checked").length) {
                            $("#check_all").attr("checked", true)
                        }
                        var item_marks = marks[flight];
                        if (item_marks) {
                            $.each(item_marks, function (i, item) {
                                item.show()
                            })
                        }
                    } else{
                        $("#check_all").attr("checked", false)
                        var item_marks = marks[flight];
                        if (item_marks) {
                            $.each(item_marks, function (i, item) {
                                item.hide()
                            })
                        }
                    }
                });

            }else
            {
                setTimeout('$("#easyui-linkbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
                alert("选择的日期数据不存在！")
                return false;
            }


            //显示或者隐藏所有国家的信标
            $("#check_all").click(function () {
                if ($(this).attr("checked") == "checked") {
                    $("#flight_check").find(":checkbox").attr("checked", true)

                    $.each(marks, function (key, value) {
                        var item_marks = marks[key];
                        $.each(item_marks, function (i, item) {
                            item.show()
                        })
                    });
                } else {
                    $("#flight_check").find(":checkbox").attr("checked", false)
                    $.each(marks, function (key, value) {
                        var item_marks = marks[key];
                        $.each(item_marks, function (i, item) {
                            item.hide()
                        })
                    });
                }
            });


            //调用显示图
            drawCharts(jsonObj);
            drawAreaCharts(jsonObj);
        })






    });
  function gettrack(formatstarttime,regions)
  {
      $.send("/regionanalysis/gettrack",{
          date: formatstarttime,
          region: regions
      },function (data){
          var jsonObj = eval(data);
          console.log(jsonObj)
          console.log(jsonObj.status)

          if(jsonObj.status == "success")
          {
              /*表格使用*/
              var data = {"total": 0, "rows": []};

              $.each(jsonObj.data.flights, function (i, flight) {

                  data['total'] = data['total'] + flight.track.length;

                  $.each(flight.track, function (i, track){
                      for (key in flight) {

                          if (key != 'track') {
                              track[key] = flight[key];
                          }
                      }
                      data.rows.push(track);
                  })
              });

              var arry=[];

              if ($("#flightpathtables").data("rows")) {
                  arry = $("#flightpathtables").data("rows");
              }

              $("#flightpathtables").data("rows",$.merge(arry,data.rows));


              $("#flightpathdg").datagrid({

                  loadMsg: '数据正在加载,请耐心的等待...',
                  loadFilter: pagerFilter,
                  pageSize: 100,
                  pageList: [100,200,500],
                  columns: [[
                      {field: 'ftime', title: '时间', width: 100, align: "center", sortable: true},
                      {field: 'flight1', title: '航班号', width: 100, align: "center"},
                      {field: 'flight2', title: '共享航班号', width: 100, align: "center"},
                      {field: 'longitude', title: '经度', width: 100, align: "center"},
                      {field: 'latitude', title: '纬度', width: 100, align: 'center'},
                      {field: 'altitude', title: '海拔(英尺)', width: 100, align: "center"},
                      {field: 'speed', title: '速度(节)', width: 100, align: "center"}
                  ]]
              });

              $("#flightpathdg").datagrid("loadData", $("#flightpathtables").data("rows"));  //动态取数据


              /*地图打点使用*/
              if (document.createElement('canvas').getContext) {
                  /*颜色定义*/
                  var colour;
                  var countnum = 0;
                  var array = [];
                  for (var i = 0; i < jsonObj.data.flights.length; i++){
                      var flights1 = jsonObj.data.flights[i].flight1;
                      var flights2 = jsonObj.data.flights[i].flight2;
                      countnum = countnum + jsonObj.data.flights[i].track.length;
                      var points = [];

                      $.each(jsonObj.data.flights[i].track, function (i, item){
                          points.push(new BMap.Point(item.longitude, item.latitude));
                      })
                      var color = COLOUR[0];
                    /*  if (index < COLOUR.length) {
                          color = COLOUR[index];
                      }*/
                      var options = {
                          size: BMAP_POINT_SIZE_SMALL,
                          shape: BMAP_POINT_SHAPE_STAR,
                          color: color
                      }
                      showflightpathMap(points, options)
                  }
                  setTimeout('$("#easyui-linkbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
                  console.log("航迹分析成功!")

              }else {
                  setTimeout('$("#easyui-linkbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
                  alert('请在chrome、safari、IE8+以上浏览器查看');
              }

          }else
          {
              setTimeout('$("#easyui-linkbutton").linkbutton("enable");$("#easyui-linkbutton").css("color","black");', 500);//5秒后恢复
              alert("选择的日期数据不存在！")
              return false;
          }
      })
  }
    //数据表格事件
    $("#statistic-search").click(function()
    {

        var begindate=$('#start_times').datebox('getValue').replace(/-/g,'');
        //开始经度
        var start_longitude = $('#start_longitude').searchbox('getValue').trim()
        //结束经度
        var end_longitude = $('#end_longitude').searchbox('getValue').trim();
        //开始纬度
        var start_latitude = $('#start_latitude').searchbox('getValue').trim();
        //结束纬度
        var end_latitude = $('#end_latitude').searchbox('getValue').trim();

        //经纬度Check
        if (start_longitude != "")  {
            if (!isNumeric(start_longitude)) {
                alert("开始经度不正确，请输入数值类型的字符");
                return false;
            } else if (parseFloat(start_longitude) <= -180 || parseFloat(start_longitude) >= 180) {
                alert("开始经度范围不正确，请输入-180到180之前的数值");
                return false;
            }
        }
        if (end_longitude != "")  {
            if (!isNumeric(end_longitude)) {
                alert("结束经度不正确，请输入数值类型的字符");
                return false;
            } else if (parseFloat(end_longitude) <= -180 || parseFloat(end_longitude) >= 180) {
                alert("结束经度范围不正确，请输入-180到180之前的数值");
                return false;
            }
        }

        if (start_longitude != "" && end_longitude != "") {
            if (parseFloat(start_longitude) > parseFloat(end_longitude)) {
                alert("开始经度不能大于结束经度")
                return false;
            }
        }


        if (start_latitude != "")  {
            if (!isNumeric(start_latitude)) {
                alert("开始纬度不正确，请输入数值类型的字符");
                return false;
            } else if (parseFloat(start_latitude) <= -90 || parseFloat(start_latitude) >= 90) {
                alert("开始纬度范围不正确，请输入-90到90之前的数值");
                return false;
            }
        }
        if (end_latitude != "")  {
            if (!isNumeric(end_latitude)) {
                alert("结束纬度不正确，请输入数值类型的字符");
                return false;
            } else if (parseFloat(end_latitude) <= -90 || parseFloat(end_latitude) >= 90) {
                alert("结束纬度范围不正确，请输入-90到90之前的数值");
                return false;
            }
        }

        if (start_latitude != "" && end_latitude != "") {
            if (parseFloat(start_latitude) > parseFloat(end_latitude)) {
                alert("开始纬度不能大于结束纬度")
                return false;
            }
        }


        var datas = $("#tables").data("rows");
        var data = {"total": 0, "rows": []};

        $.each(datas,function (i,item) {

            if(begindate != "" && ( begindate != item.date ))
            {
                return;
            }

            if(parseFloat(start_longitude) !="" && (parseFloat(start_longitude) > parseFloat(item.longitude) ) )
            {
                return;
            }

            if(parseFloat(end_longitude) !="" && (parseFloat(end_longitude) < parseFloat(item.longitude)))
            {
                return;
            }

            if(parseFloat(start_latitude) !="" && (parseFloat(start_latitude) > parseFloat(item.latitude)))
            {
                return;
            }

            if(parseFloat(end_latitude) !="" && (parseFloat(end_latitude) < parseFloat(item.latitude)))
            {
                return;
            }

            data.rows.push(item);
        })

        $("#dg").datagrid({
            loadMsg: '数据正在加载,请耐心的等待...',
            loadFilter: pagerFilter,
            pageSize: 50,
            pageList: [50, 100],
            columns: [[
                {field: 'ftime', title: '时间', width: 100, align: "center", sortable: true},
                {field: 'flight1', title: '航班号', width: 100, align: "center"},
                {field: 'flight2', title: '共享航班号', width: 100, align: "center"},
                {field: 'longitude', title: '经度', width: 100, align: "center"},
                {field: 'latitude', title: '纬度', width: 100, align: 'center'},
                {field: 'altitude', title: '海拔(英尺)', width: 100, align: "center"},
                {field: 'speed', title: '速度(节)', width: 100, align: "center"}
            ]]
        });
        $("#dg").datagrid("loadData",  data.rows);  //动态取数据
    });

    //清屏处理
    $("#flightcleantrack").click(function()
    {
        cleanmap();
        marks={};
        $("#flight_check").empty();
    });


})