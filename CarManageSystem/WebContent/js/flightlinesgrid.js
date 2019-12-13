$().ready(function () {

    //数据表格事件
    $("#flightpath-search").click(function()
    {
        //航班号
        var airnumber=$("#airnumber ").val();
        //共享航班号
        var sharenumber = $("#sharenumber").val();
        //开始经度
        var start_longitude = $('#start_longitude').searchbox('getValue').trim()
        //结束经度
        var end_longitude = $('#end_longitude').searchbox('getValue').trim();
        //开始纬度
        var start_latitude = $('#start_latitude').searchbox('getValue').trim();
        //结束纬度
        var end_latitude = $('#end_latitude').searchbox('getValue').trim();
        //开始高度
        var start_heights = $('#start_heights').searchbox('getValue').trim();
        //结束高度
        var end_heights = $('#end_heights').searchbox('getValue').trim();


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
        if(start_heights != "")
        {
            if (!isNumeric(start_heights)) {
                alert("高度必须为数值类型，请输入数值类型的字符");
                return false;
            }
        }
        if(end_heights != "")
        {
            if (!isNumeric(end_heights)) {
                alert("高度必须为数值类型，请输入数值类型的字符");
                return false;
            }
        }

        if (start_heights != "" && end_heights != "") {
            if (parseFloat(start_heights) > parseFloat(end_heights)) {
                alert("开始高度不能大于结束高度")
                return false;
            }
        }


        var datas = $("#flightpathtables").data("rows");
        console.log(datas)
        var data = {"total": 0, "rows": []};

        $.each(datas,function (i,item) {

            if(airnumber != "" && airnumber != "请选择" && ( airnumber != item.flight1 ))
            {
                return;
            }

            if(sharenumber != "" &&  sharenumber != "请选择" && ( sharenumber != item.flight2))
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

            if(parseFloat(start_heights) !="" && (parseFloat(start_heights) > parseFloat(item.altitude)))
            {
                return;
            }

            if(parseFloat(end_heights) !="" && (parseFloat(end_heights) < parseFloat(item.altitude)))
            {
                return;
            }

            data.rows.push(item);
        })

        $("#flightpathdg").datagrid({
            loadMsg: '数据正在加载,请耐心的等待...',
            loadFilter: pagerFilter,
            pageSize: 50,
            pageList: [50, 100],
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
        $("#flightpathdg").datagrid("loadData",  data.rows);  //动态取数据

    });

})