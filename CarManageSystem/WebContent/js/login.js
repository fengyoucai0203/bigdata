$().ready(function() {

	newPos = new Object();
	newPos.left = ($(document).width() - $("#mainDiv").width()) / 2;
	newPos.top = ($(document).height() - $("#mainDiv").height()) / 2;
	$("#mainDiv").offset(newPos);
	$("#cancel").click(function() {
		$("input[type=text]").val("");
		$("input[type=password]").val("");
	});

	$(document).keyup(function(even) {
		if (even.keyCode == 13) {
			var name = $("input[type=text]").val();
			var pass = $("input[type=password]").val();
			login(name, pass);
		}
	});

	$("#ok").click(function() {
		
		var name = $("input[type=text]").val();
		var pass = $("input[type=password]").val();
		login(name, pass);
	});
});

function login(name, pass) {
	$.ajax({
		type : 'post',
		url : 'loginServlet',
		async : false,
		dataType : 'text',
		data : {
			name : name,
			pass : pass
		},
			
		success : function(data, textStatus) {
			console.log(data)
			if (data == "success") {
				window.location = "index.jsp";
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
