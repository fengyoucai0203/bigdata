$().ready(function () {

    function loaddata() {
        $.send("/config/read",{},function (data) {
            var jsondata= eval(data);
            if(jsondata.status == "success")
            {
                $.each(jsondata.data.params,function (i,item) {

                    if(item.ckey == "ThresBlockLatitude")
                    {
                        $("#mlatitude").val(item.cvalue)
                    }
                    if(item.ckey == "ThresBlockLongitude")
                    {
                        $("#mlongitude").val(item.cvalue)
                    }
                    if(item.ckey == "ThresPointNumberForBlock")
                    {
                        $("#mpoints").val(item.cvalue)
                    }
                    if(item.ckey == "ThresRatioForExcepTrack")
                    {
                        $("#errortruck").val(item.cvalue)
                    }
                    if(item.ckey == "ThresLostTrackTime")
                    {
                        $("#lossrate").val(item.cvalue)
                    }
                    if (item.ckey =="ThresRatioForExcepTrackExt") {
                        $("#ratioForExcepTrackExt").val(item.cvalue);
                    }

                })
            }else
            {
                alert("系统异常。请联系管理员!")
            }

        });
    }

    //加载数据
    loaddata()

    //应用
 $("#reload").click(function()
 {
     var mlongitude = $("#mlongitude").val()
     var mlatitude =$("#mlatitude").val()
     var mpoints =$("#mpoints").val()
     var errortruck = $("#errortruck").val();
     var lossrate =$("#lossrate").val();
     var ratioForExcepTrackExt = $("#ratioForExcepTrackExt").val();

     //check输入框的值

     if (mlongitude != "")  {
         if (!isNumeric(mlongitude)) {
             alert("请输入数值类型的字符");
             return false;
         }
     }
     if (mlatitude != "")  {
         if (!isNumeric(mlatitude)) {
             alert("请输入数值类型的字符");
             return false;
         }
     }
     if (mpoints != "")  {
         if (!isNumeric(mpoints)) {
             alert("请输入数值类型的字符");
             return false;
         }
     }
     if (errortruck != "")  {
         if (!isNumeric(errortruck)) {
             alert("请输入数值类型的字符");
             return false;
         }
     }
     if (lossrate != "")  {
         if (!isNumeric(lossrate)) {
             alert("请输入数值类型的字符");
             return false;
         }
     }
     if (ratioForExcepTrackExt != "")  {
         if (!isNumeric(ratioForExcepTrackExt)) {
             alert("请输入数值类型的字符");
             return false;
         }
     }


     if(confirm("您即将要更新系统参数。您确定要继续吗？")) {
         var jsondata = [
             {
                 "ckey": "ThresBlockLatitude",
                 "cvalue": mlatitude
             },
             {
                 "ckey": "ThresBlockLongitude",
                 "cvalue": mlongitude
             },
             {
                 "ckey": "ThresPointNumberForBlock",
                 "cvalue": mpoints
             },
             {
                 "ckey": "ThresRatioForExcepTrack",
                 "cvalue": errortruck
             },
             {
                 "ckey": "ThresLostTrackTime",
                 "cvalue": lossrate
             },
             {
                 "ckey": "ThresRatioForExcepTrackExt",
                 "cvalue": ratioForExcepTrackExt
             }
             ];

         $.send("/config/write",JSON.stringify(jsondata),function (result) {

             var jsonObj = eval(result);

             if (jsonObj.status == "success") {

                 $.send("/config/read",{},function (data) {

                     var jsondata= eval(data);
                     if(jsondata.status == "success")
                     {
                         $.each(jsondata.data.params,function (i,item) {

                             if(item.ckey == "ThresBlockLatitude")
                             {
                                 $("#mlatitude").val(item.cvalue)
                             }
                             if(item.ckey == "ThresBlockLongitude")
                             {
                                 $("#mlongitude").val(item.cvalue)
                             }
                             if(item.ckey == "ThresPointNumberForBlock")
                             {
                                 $("#mpoints").val(item.cvalue)
                             }
                             if(item.ckey == "ThresRatioForExcepTrack")
                             {
                                 $("#errortruck").val(item.cvalue)
                             }
                             if(item.ckey == "ThresLostTrackTime")
                             {
                                 $("#lossrate").val(item.cvalue)
                             }
                             if(item.ckey == "ThresRatioForExcepTrackExt")
                             {
                                 $("#ratioForExcepTrackExt").val(item.cvalue)
                             }
                         })

                         alert("修改成功!")

                     }else
                     {
                         alert("系统异常。请联系管理员!")
                     }

                 });
             }else {
                 alert("系统异常，请联系管理员")
             }
         });
     }
 });
    //撤销恢复默认值
    $("#remove").click(function()
    {
        if(confirm("您即将要恢复系统参数。您确定要继续吗？")){
            $.send("/config/restore", {}, function (data) {
                if(data.status == "success")
                {
                    //重新加载数据
                    loaddata();
                    alert("默认值恢复成功!")
                }else
                {
                    alert("系统异常。请联系管理员!")
                }
            });
        }
    })

});
