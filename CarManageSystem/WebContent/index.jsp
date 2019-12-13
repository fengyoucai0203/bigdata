<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta HTTP-EQUIV="pragma" CONTENT="no-cache">
    <meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
    <meta HTTP-EQUIV="expires" CONTENT="0">
    <title>城市垃圾车的监管系统</title>
    <link rel="stylesheet" type="text/css" href="resouse/jquery-easyui-1.5.3/themes/bootstrap/easyui.css" />
    <link rel="stylesheet" type="text/css" href="css/home.css" />
    <link rel="stylesheet" type="text/css" href="css/icon.css" />
    <link rel="stylesheet" type="text/css" href="css/default.css" />
    <link rel="stylesheet" type="text/css" href="css/toast/toast.css" />
    <link rel="stylesheet" type="text/css" href="css/loading/jquery.mloading.css" />
    <script type="text/javascript" src="js/route.js"></script>
    <script type="text/javascript" src="resouse/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="resouse/jquery-easyui-1.5.3/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="resouse/jquery-easyui-1.5.3/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="resouse/jquery-easyui-1.5.3/plugins/jquery.datagrid.js"></script>
    <script type="text/javascript" src="resouse/echarts.js"></script>
    <script type="text/javascript" src="js/jquery.mloading.js"></script>
    <script type="text/javascript" src="js/toast.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/home.js"></script>
    <script type="text/javascript" src="js/charts.js"></script>
    <script type="text/javascript" src="js/lostcharts.js"></script>
    <script type="text/javascript" src="js/XiuCai.index.js"> </script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=CMshB0qQz9Z9FF86ShoU7X2m3mwLSHuv"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/CurveLine/1.5/src/CurveLine.min.js"></script>
</head>
<body class="easyui-layout">

<div class="main" data-options="region:'center'" style="overflow: hidden;" id="mainPanle">

    <div id="toolbar">
        <div class="toolbar-search">
            <label>油量：</label><input name="youliang" type="text" value="11" class="easyui-searchbox" style="width:100px" >&nbsp;&nbsp
            <label>车速：</label><input name="chesu" type="text" value="11" class="easyui-searchbox" style="width:100px" >&nbsp;&nbsp
            <label>发动机转速：<input name="fadongji" type="text" value="11" class="easyui-searchbox" style="width:100px" >&nbsp;&nbsp
            <label>经度：<input name="jindu" type="text" value="117.25" class="easyui-searchbox" style="width:100px" >&nbsp;&nbsp
		    <label>纬度：<input name="weidu" type="text" value="31.83" class="easyui-searchbox" style="width:100px" >&nbsp;&nbsp
			<label>车辆编号：<input name="bianhao" type="text" value="NO1" class="easyui-searchbox" style="width:100px" >&nbsp;&nbsp         
            <a href="javascript:void(0)"  id="canshu" class="easyui-linkbutton"  data-options="iconCls:'icon-search'" iconCls="icon-search">修改汽车参数</a>&nbsp&nbsp&nbsp&nbsp
            <a href="javascript:void(0)"  id="jiankong" class="easyui-linkbutton"  data-options="iconCls:'icon-search'" iconCls="icon-search">监控大厅</a>&nbsp&nbsp&nbsp&nbsp
       
        </div>
    </div>
  
    <div id = "easyui-tab" class="easyui-tabs" >
    <div title="当前城市">
    <!--当前城市-->
    <div id="trackmap" style="height:785px;">
        <div style="float:left;width:100%;height:784px;" id="map"></div>
    </div>
    </div>
    </div>
</div>
<!-- end of main -->

<script type="text/javascript">

    var windHeight = $(document).height();
    var titletabs = windHeight-70-40;
   $("#easyui-tab").css("height" , titletabs+"px");
    // 百度地图API功能
    var map = new BMap.Map("map");
    var point = new BMap.Point(117.25,31.83);
    map.centerAndZoom(point,15);
    map.enableScrollWheelZoom();
	
    
    //添加小车
	var pt = new BMap.Point(117.25,31.83);
	var myIcon = new BMap.Icon("images/2.png", new BMap.Size(300,157));
	var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
	map.addOverlay(marker2);              // 将标注添加到地图中
	var content1 = "车牌号:皖A111111  垃圾桶编号:NB01";
	addClickHandler(content1,marker2);
	var cc = 33;
	var dd = "NBW222"
	  //添加小车
	var pt = new BMap.Point(117.27,31.85);
	var myIcon1 = new BMap.Icon("images/3.png", new BMap.Size(300,157));
	var marker3 = new BMap.Marker(pt,{icon:myIcon1});  // 创建标注
	map.addOverlay(marker3); 
	var content = "车牌号:"+cc+"垃圾桶编号:"+dd;
	addClickHandler(content,marker3);
	
		var opts = {
				width : 250,     // 信息窗口宽度
				height: 80,     // 信息窗口高度
				title : "垃圾车汽车信息" , // 信息窗口标题
				enableMessage:true//设置允许信息窗发送短息
			   };
	
		
		function addClickHandler(content,marker){
			marker.addEventListener("click",function(e){
				openInfo(content,e)}
			);
		}
		function openInfo(content,e){
			var p = e.target;
			var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
			var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
			map.openInfoWindow(infoWindow,point); //开启信息窗口
		}
		
	
	
  /*   function myFun(result){
        var cityName = result.name;
        map.setCenter(cityName);
    }

    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
 */
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.addControl(top_left_control);

    //显示地图
    function showMap(points,options,datemarks,message,message1){

        var lng = 0;
        var lat = 0;

        $.each(points,function(i,item)
        {
            lng = lng +item.lng;
            lat = lat +item.lat;

            if(i == "1")
            {
                var vectorMarker = new BMap.Marker(new BMap.Point(item.lng, item.lat), {
                    // 指定Marker的icon属性为Symbol
                    icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                        scale: 1,//图标缩放大小
                        fillColor: "blue",//填充颜色
                        fillOpacity: 0.5//填充透明度
                    })
                });
                map.addOverlay(vectorMarker);
                datemarks.push(vectorMarker);

                //添加详细信息
                var opts = {
                    width : 280,     // 信息窗口宽度
                    height: 150,     // 信息窗口高度
                    title : "<b style='font-weight: bold'>起飞点信息</b>"
                };

                var messages = "<ul>";
                messages += "<li><b style='font-weight: bold'>日期:&nbsp;&nbsp;</b>" + message.ftime + "</li>";
                messages += "<li><b style='font-weight: bold'>航班号:&nbsp;&nbsp;</b>" + message.flights1 + "</li>";
                messages += "<li><b style='font-weight: bold'>共享航班号:&nbsp;&nbsp;</b>" + message.flights2 + "</li>";
                messages += "<li><b style='font-weight: bold'>始发机场:&nbsp;&nbsp;</b>" + message.start_name_en + "</li>";
                messages += "<li><b style='font-weight: bold'>始发城市国家:&nbsp;&nbsp;</b>" + message.start_city_cn + ", " + message.start_country_cn + "</li>";
                messages += "<li><b style='font-weight: bold'>经度:&nbsp;&nbsp;</b>" + message.longitude + "</li>";
                messages += "<li><b style='font-weight: bold'>纬度:&nbsp;&nbsp;</b>" + message.latitude + "</li>";
                messages += "<li><b style='font-weight: bold'>高度:&nbsp;&nbsp;</b>" + message.altitude+"<span>&nbsp;&nbsp;(英尺)</span>"+ "</li>";
                messages += "<li><b style='font-weight: bold'>速度:&nbsp;&nbsp;</b>" + message.speed +"<span>&nbsp;&nbsp;(节)</span>"+"</li>";

                var infoWindow = new BMap.InfoWindow(messages, opts);  // 创建信息窗口对象
                vectorMarker.addEventListener("mouseover", function(){
                    map.openInfoWindow(infoWindow,new BMap.Point(item.lng, item.lat)); //开启信息窗口
                });

            }

            if(i == (points.length -1))
            {
                var vectorMarker = new BMap.Marker(new BMap.Point(item.lng, item.lat), {
                    // 指定Marker的icon属性为Symbol
                    icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                        scale: 1,//图标缩放大小
                        fillColor: "green",//填充颜色
                        fillOpacity: 0.5//填充透明度
                    })
                });
                map.addOverlay(vectorMarker);
                datemarks.push(vectorMarker);

                //添加详细信息
                var opts = {
                    width : 280,     // 信息窗口宽度
                    height: 150,     // 信息窗口高度
                    title : "<b style='font-weight: bold'>降落点信息</b>"
                };

                var messages = "<ul>";
                messages += "<li><b style='font-weight: bold'>日期:&nbsp;&nbsp;</b>" + message1.ftime + "</li>";
                messages += "<li><b style='font-weight: bold'>航班号:&nbsp;&nbsp;</b>" + message1.flights1 + "</li>";
                messages += "<li><b style='font-weight: bold'>共享航班号:&nbsp;&nbsp;</b>" + message1.flights2 + "</li>";
                messages += "<li><b style='font-weight: bold'>降落机场:&nbsp;&nbsp;</b>" + message.end_name_en + "</li>";
                messages += "<li><b style='font-weight: bold'>降落城市国家:&nbsp;&nbsp;</b>" + message.end_city_cn + ", " + message.end_country_cn + "</li>";
                messages += "<li><b style='font-weight: bold'>经度:&nbsp;&nbsp;</b>" + message1.longitude + "</li>";
                messages += "<li><b style='font-weight: bold'>纬度:&nbsp;&nbsp;</b>" + message1.latitude + "</li>";
                messages += "<li><b style='font-weight: bold'>高度:&nbsp;&nbsp;</b>" + message1.altitude+"<span>&nbsp;&nbsp;(英尺)</span>"+ "</li>";
                messages += "<li><b style='font-weight: bold'>速度:&nbsp;&nbsp;</b>" + message1.speed +"<span>&nbsp;&nbsp;(节)</span>"+"</li>";


                var infoWindow = new BMap.InfoWindow(messages, opts);  // 创建信息窗口对象
                vectorMarker.addEventListener("mouseover", function(){
                    map.openInfoWindow(infoWindow,new BMap.Point(item.lng, item.lat)); //开启信息窗口
                });
            }

        })
    }

	function showalter(a)
	{
		alert("修改成功")	
		 var windHeight = $(document).height();
		    var titletabs = windHeight-70-40;
		   $("#easyui-tab").css("height" , titletabs+"px");
		    // 百度地图API功能
		    var map = new BMap.Map("map");
		    var point = new BMap.Point(117.25,31.83);
		    map.centerAndZoom(point,15);
		    map.enableScrollWheelZoom();
			
		    var a = 117.25;
		    var b = 31.83;
		    //添加小车
			var pt = new BMap.Point(a,b);
			var myIcon = new BMap.Icon("images/2.png", new BMap.Size(300,157));
			var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
			map.addOverlay(marker2);              // 将标注添加到地图中
			var content1 = "车牌号:皖A11哒哒哒哒哒哒顶顶顶顶1111  垃圾桶编号:NB01";
			addClickHandler(content1,marker2);
			var cc = 33;
			var dd = "ddddddddddddddd";
			  //添加小车
			  var a = 117.27
			 var b = 31.85;
			var pt = new BMap.Point(a,b);
			var myIcon1 = new BMap.Icon("images/3.png", new BMap.Size(300,157));
			var marker3 = new BMap.Marker(pt,{icon:myIcon1});  // 创建标注
			map.addOverlay(marker3); 
			var content = "车牌号:"+cc+"垃圾桶编号:"+dd;
			addClickHandler(content,marker3);
			
				var opts = {
						width : 250,     // 信息窗口宽度
						height: 80,     // 信息窗口高度
						title : "垃圾车汽车信息" , // 信息窗口标题
						enableMessage:true//设置允许信息窗发送短息
					   };
			
				
				function addClickHandler(content,marker){
					marker.addEventListener("click",function(e){
						openInfo(content,e)}
					);
				}
				function openInfo(content,e){
					var p = e.target;
					var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
					var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
					map.openInfoWindow(infoWindow,point); //开启信息窗口
				}
				
			
			
		  /*   function myFun(result){
		        var cityName = result.name;
		        map.setCenter(cityName);
		    }

		    var myCity = new BMap.LocalCity();
		    myCity.get(myFun);
		 */
		        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
		        map.addControl(new BMap.NavigationControl());
		        map.addControl(new BMap.ScaleControl());
		        map.addControl(new BMap.OverviewMapControl());
		        map.addControl(new BMap.MapTypeControl());
		        map.addControl(top_left_control);
		        
	}
    //显示地图
    function showavgMap(points,options){

        var lng = 0;
        var lat = 0;
        $.each(points,function(i,item)
        {
            lng = lng +item.lng;
            lat = lat +item.lat;

            if(i == "1")
            {
                var vectorMarker = new BMap.Marker(new BMap.Point(item.lng, item.lat), {
                    // 指定Marker的icon属性为Symbol
                    icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                        scale: 1,//图标缩放大小
                        fillColor: "blue",//填充颜色
                        fillOpacity: 0.5//填充透明度
                    })
                });
                map.addOverlay(vectorMarker);
            }


            if(i == (points.length -1))
            {
                var vectorMarker = new BMap.Marker(new BMap.Point(item.lng, item.lat), {
                    // 指定Marker的icon属性为Symbol
                    icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                        scale: 1,//图标缩放大小
                        fillColor: "green",//填充颜色
                        fillOpacity: 0.5//填充透明度
                    })
                });
                map.addOverlay(vectorMarker);
            }

        })

        map.centerAndZoom(new BMap.Point(lng/points.length,lat/points.length), 5);    // 初始化地图,设置中心点坐标和地图级别
        var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection

        pointCollection.addEventListener('click', function (e) {
            alert('当前坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
        });
        map.addOverlay(pointCollection);// 添加Overlay
    }


    //显示异常地图
    function showerrorMap(points,options){

        var lng = 0;
        var lat = 0;
        $.each(points,function(i,item)
        {
            lng = lng +item.lng;
            lat = lat +item.lat;

            if(i == "1")
            {
                var vectorMarker = new BMap.Marker(new BMap.Point(item.lng, item.lat), {
                    // 指定Marker的icon属性为Symbol
                    icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                        scale: 1,//图标缩放大小
                        fillColor: "blue",//填充颜色
                        fillOpacity: 0.5//填充透明度
                    })
                });
                map.addOverlay(vectorMarker);
            }


            if(i == (points.length -1))
            {
                var vectorMarker = new BMap.Marker(new BMap.Point(item.lng, item.lat), {
                    // 指定Marker的icon属性为Symbol
                    icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                        scale: 1,//图标缩放大小
                        fillColor: "green",//填充颜色
                        fillOpacity: 0.5//填充透明度
                    })
                });
                map.addOverlay(vectorMarker);
            }

        })

        map.centerAndZoom(new BMap.Point(lng/points.length,lat/points.length), 5);    // 初始化地图,设置中心点坐标和地图级别
        var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection

        pointCollection.addEventListener('click', function (e) {
            alert('当前坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
        });
        map.addOverlay(pointCollection);// 添加Overlay

    }




    var airoptions;

    function drawChart(x,param) {

        var jsondata = param;
        var starttime =[];
        var endtime =[];
        var starttimes={};
        var endtimes={}

        var time_to_sec = function (time) {
            var s = '';
            var hour = time.split(':')[0];
            var min = time.split(':')[1];
            var sec = time.split(':')[2];
            s = Number(hour*3600) + Number(min*60) + Number(sec);
            return s;
        };

        for (var i = 0; i < jsondata.data.flights.length; i++)
        {
            var lengths = jsondata.data.flights[i].track.length;
            $.each(jsondata.data.flights[i].track, function (i, item){
                if(i == "0")
                {
                   /* var date = item.ftime;
                    var t1 = new Date(date);*/
                   console.log(item.ftime.substr(11,8))
                    var startt =time_to_sec(item.ftime.substr(11,8));

                    if (!starttimes[startt]) {
                        starttimes[startt] = [];
                    }
                    starttimes[startt].push(startt);
                   // starttime.push(time_to_sec(item.ftime.substr(11,8)))
                }

                if(i== (lengths -1))
                {
                    console.log(item.ftime.substr(11,8))

                    var endt = time_to_sec(item.ftime.substr(11,8));

                    if (!endtimes[endt]) {
                        endtimes[endt] = [];
                    }
                    endtimes[endt].push(endt);
                  //  endtime.push(time_to_sec(item.ftime.substr(11,8)))
                }
            })
        }

        $.each(starttimes,function (i,item)
        {
            starttime.push(i)

        })

        console.log(starttime)

        $.each(endtimes,function (i,item)
        {
            endtime.push(i)

        })
        console.log(endtime);


        //使用刚指定的配置项和数据显示图表。
        airoptions = {

            title:{
                text: '基本数据',
            },

            tooltip: {
                trigger: 'axis',
                formatter: function(datas)
                {
                    if(datas instanceof Array)//判断是数组
                    {
                        var res = datas[0].name + '<br/>',
                            val;
                        for(var i = 0, length = datas.length; i < length; i++)
                        {
                            var time =datas[i].value;

                            var theTime = parseInt(time);// 秒
                            var theTime1 = 0;// 分
                            var theTime2 = 0;// 小时
                            if(theTime > 60) {
                                theTime1 = parseInt(theTime/60);
                                theTime = parseInt(theTime%60);
                                if(theTime1 > 60) {
                                    theTime2 = parseInt(theTime1/60);
                                    theTime1 = parseInt(theTime1%60);
                                }
                            }
                            var result = ""+parseInt(theTime)+"秒";
                            if(theTime1 >10) {
                                result = ""+parseInt(theTime1)+"分"+result;
                            }else
                            {
                                result = ""+parseInt("+0+"+theTime1)+"分"+result;
                            }
                            if(theTime2 > 0) {
                                result = ""+parseInt(theTime2)+"时"+result;
                            }
                            val = result;
                            res += datas[i].seriesName + '：' + val + '<br/>';
                        }
                        return res;
                    }else
                    {
                        var res = datas.name + '<br/>',
                            val;

                        var time =datas.value;
                        var theTime = parseInt(time);// 秒
                        var theTime1 = 0;// 分
                        var theTime2 = 0;// 小时
                        if(theTime > 60) {
                            theTime1 = parseInt(theTime/60);
                            theTime = parseInt(theTime%60);
                            if(theTime1 > 60) {
                                theTime2 = parseInt(theTime1/60);
                                theTime1 = parseInt(theTime1%60);
                            }
                        }
                        var result = ""+parseInt(theTime)+"秒";
                        if(theTime1 >10) {
                            result = ""+parseInt(theTime1)+"分"+result;
                        }else
                        {
                            result = ""+parseInt("+0+"+theTime1)+"分"+result;
                        }
                        if(theTime2 > 0) {
                            result = ""+parseInt(theTime2)+"时"+result;
                        }
                        val = result;
                        res += datas.seriesName + '：' + val + '<br/>';
                        return res;
                    }
                }

            },
            color:['#3420ff','#43ff30'],
            legend: {
                data:['开始时间','结束时间']
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

            xAxis:{
                type: 'category',
                boundaryGap: false,
                data: x

            },

            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter:function(value)
                    {
                        var theTime = parseInt(value);// 秒
                        var theTime1 = 0;// 分
                        var theTime2 = 0;// 小时
                        if(theTime > 60) {
                            theTime1 = parseInt(theTime/60);
                            theTime = parseInt(theTime%60);

                            if(theTime1 > 60) {
                                theTime2 = parseInt(theTime1/60);
                                theTime1 = parseInt(theTime1%60);
                            }
                        }
                        var result ="";
                        if(theTime2 > 0) {
                            result = ""+parseInt(theTime2)+"时"+result;
                        }
                        return result;
                    }
                }
            },
            series: [
                {
                    name:'开始时间',
                    type:'line',
                    data:starttime,

                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#3420ff'
                            }
                        }
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'结束时间',
                    type:'line',
                    data:endtime,
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最大值'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    },itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#43ff30'
                        }
                    }
                }
                }
            ]
        };

        charts.setOption(airoptions);
    }

   /* 异常航迹 初始化统计数据  */


    var space_charts = {};

    function drawChartserror(jsonObj) {

        var x_data = [];
        var y_data = [];

        $.each(jsonObj.data.tracks, function (i, item){

                var dates = item.date;

                if (!space_charts[dates]) {
                    space_charts[dates] = [];
                }
                space_charts[dates].push(parseFloat(item.var));
        });

        $.each(space_charts, function (key, value) {

            x_data.push((key));
            y_data.push(((1- value[0]) *100).toFixed(1))
        });


        // 使用刚指定的配置项和数据显示图表。
        var flight_options = {

            title: {
                text: '航迹偏差率统计图',
            },
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
                data:['航迹偏差率']
            },
            xAxis: [
                {
                    type: 'category',
                    data: x_data,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '偏差率',
                    interval: 10,
                    axisLabel: {
                        formatter: '{value}% '
                    }
                }
            ],
            series: [
                {
                    name:'偏差率',
                    type:'bar',
                    data:y_data,

                    label: {
                        normal: {
                            show: true,
                            position: 'insideTop',
                            formatter:'{c}%'
                        }
                    }
                }
            ]
        };



        flightstatisticscharts.setOption(flight_options);
    }





    /*画失跟率*/
    var lostoptions;

    function lostdrawChart(param)
    {

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

        // 使用刚指定的配置项和数据显示图表。
        lostoptions = {




            title: {
                text: '失跟率',
            },
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
                data:['失跟率']
            },
            xAxis: [
                {
                    type: 'category',
                    data: x,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '失跟率',
                    interval: 10,
                    axisLabel: {
                        formatter: '{value}% '
                    }
                }
            ],
            series: [
                {
                    name:'失跟率',
                    type:'bar',
                    data:losttracks,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTop',
                            formatter:'{c}%'
                        }
                    }
                }
            ]




/*
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
            ]*/




        };
        lostcharts.setOption(lostoptions);
    }
/*    //Tab切换时显示统计图
    $('#easyui-tab').tabs({
        onSelect:function(title){
            if (title == "统计分析" && airoptions) {

                charts.setOption(airoptions);
            }
        }
    });

    $("#titlestab").tabs({
        onLoad: function(panel){console.log(panel)},
        onSelect: function(title, index){console.log(title)},
        onUnselect: function(title, index){console.log(title)},
        onBeforeClose: function(title, index){console.log(title)},
        onClose: function(title, index){console.log(title)},
        onAdd: function(title, index){console.log(title)},
        onUpdate: function(title, index){console.log(title)},
        onContextMenu: function(e, title, index){console.log(title)}
    })*/

    function  cleanmaphome()
    {
        map.clearOverlays();
    }

    function onChangeDate(date){
        //给结束时间赋值
        var begindate=$('#start_time').datebox('getValue');//注意.datebox('getValue'
        $("#end_time").datebox('setValue',begindate);

    }

    //Tab切换时显示统计图
    $('#easyui-tab').tabs({
        border:false,
        onSelect:function(title){

            if (title == "航迹数据" ){
                //给结束时间赋值
                var begindate=$('#start_time').datebox('getValue');//注意.datebox('getValue'
                $("#start_times").datebox('setValue',begindate);
            }

        }
    });


</script>
</body>
</html>