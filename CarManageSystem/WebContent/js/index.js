$(document).ready(function () {

    /*搜索事件*/
    $("#canshu").click(function() {
    	alert(11)
        var youlinag = $("input[name='youliang']").val();
        var chesu = $("input[name='chesu']").val();
        var fadongji = $("input[name='fadongji']").val();
        var jindu = $("input[name='jindu']").val();
        var weidu = $("input[name='weidu']").val();
        var bianhao = $("input[name='bianhao']").val();
        
        insert(youlinag, chesu,fadongji,jindu,weidu,bianhao);

    });
    
    
    function insert(youlinag, chesu,fadongji,jindu,weidu,bianhao) {
    	$.ajax({
    		type : 'post',
    		url : 'insertServlet',
    		async : false,
    		dataType : 'text',
    		data : {
    			youlinag : youlinag,
    			chesu : chesu,
    			fadongji : fadongji,
    			jindu :jindu,
    			weidu :weidu,
    			bianhao :bianhao
    		},
    			
    		success : function(data, textStatus) {
    			
    			if (data == "success") {
    				showalter(data)
    				//window.location = "index.jsp";
    			} else {
    				$("input[type=text]").val("");
    				$("input[type=password]").val("");
    				$("#errorMessage").text("您提供的用户密码有误。");
    			}
    		},
    		error : function(XMLHttpRequest, textStatus, errorThrowns) {
    			alert(errorThrowns);
    		}
    	});
    }
    
    
    

});