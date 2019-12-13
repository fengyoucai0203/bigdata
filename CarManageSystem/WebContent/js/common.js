//地图打点使用
COLOUR=["#000079","#006000","#FF8000","#6F00D2","#844200","#783ec4","#B7FF4A","#6C3365","#5CADAD","#B9B973","#FF77FF","#fcf4a9", "#CF2CFF","#984B4B"];
//菜单定义
var _menus = {

    "menus": [{
        "menuid": "1",
        "icon": "icon-sys",
        "menuname": "监控地图",
        "menus":[
            {
                "menuid": "15",
                "menuname": "航班号查询",
                "icon": "icon-nav",
                "url": "flight.html"
            },
            {
            "menuid": "12",
            "menuname": "单个航班分析",
            "icon": "icon-nav",
            "url": "home.html"
        },
            {
                "menuid": "13",
                "menuname": "双航班相似度分析",
                "icon": "icon-nav",
                "url": "demo.html"
            },
            {
                "menuid": "14",
                "menuname": "多航班分析",
                "icon": "icon-nav",
                "url": "demo.html"
            }

        ]
    }
        ]
};

(function($){
    $.send= function(url,data,callbak,is_sync)
        {
            if (is_sync) {
                is_sync = false;
            } else {
                is_sync = true;
            }

            $("body").mLoading();
            $.ajax({
                type: "post",
                url: BASE_URL + url,
                data: data,
                async:is_sync,
                success: function (data) {
                    $("body").mLoading("hide");
                    if (data.status == 'success') {
                        callbak(data)
                    } else {
                        alert(data.msg);
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrowns) {
                    $("body").mLoading("hide");
                    alert(errorThrowns);
                }
            });
        };
})(jQuery);

/*表格数据*/
/**
 * Name 分页过滤器
 */
function pagerFilter(data){

    if (typeof data.length == 'number' && typeof data.splice == 'function'){// is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage:function(pageNum, pageSize){
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh',{pageNumber:pageNum,pageSize:pageSize});
            dg.datagrid('loadData',data);
        }
    });
    if (!data.originalRows){
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

function alert(message) {

    $('body').toast({
        position:'absolute',
        top:'10%',
        content:message,
        duration:3000,
        isCenter:false,
        background:'rgba(230,0,0,0.5)',
        animateIn:'bounceIn-hastrans',
        animateOut:'bounceOut-hastrans',
    });
}

function isNumeric(a)
{
    var reg = /^[-|+]?[0-9]+.?[0-9]*$/;
    return(reg.test(a));
}

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