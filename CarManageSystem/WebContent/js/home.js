$().ready(function () {

    //数据表格事件
    $("#statistic-search").click(function()
    {
        filterData();
    });

})

function onFilterData() {
    filterData();
}

//过滤数据
function filterData() {
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
}