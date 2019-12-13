<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="css/login.css" type="text/css" rel="stylesheet" />
	<script type="text/javascript" src="js/route.js"></script>
<script type="text/javascript" src="resouse/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/login.js"></script>
<title>城市垃圾车监管系统</title>
</head>
<body>
	 <div id="mainDiv">
	 	<div id="title">
	 		<h1>城市垃圾车的监管系统</h1>
	 	</div>
	 	<table>
	 		<tr>
	 			<td rowspan="3" style="width: 130px;vertical-align: top;"><img id="timeImg" src="images/logo.jpg"/>
	 				<div id="errorMessage"></div>
	 			</td>
	 			<td>管理员：</td>
	 			<td><input type="text" /></td>
	 		</tr>
	 		<tr>
	 			<td>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</td>
	 			<td><input type="password" /></td>
	 		</tr>
	 		<tr>
	 			<td colspan=2>
	 			<input id="ok" class="button" type="button" value="登  陆"/>
	 			<input id="cancel" class="button" type="button" value="重  置"/></td>
	 		</tr>
	 	</table>
	 </div>
</body>

</html>