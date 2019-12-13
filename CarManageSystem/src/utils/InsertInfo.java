package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


import jdbc.DBUtils;

public class InsertInfo {
	
	public static boolean insertinfo(String youliang,String chesu,String fadongji,Double jindu,Double weidu ,String  bianhao ) throws SQLException 
	{
		boolean flag = true;
		Connection conn = DBUtils.getConnection();
		String sql  = "update  carinfo set youliang = '"+youliang+"',chesu ='"+chesu+"',fadongji = '"+fadongji+"',jindu="+jindu+",weidu="+weidu+" where bianhao ='"+bianhao+"' ";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.executeUpdate();
		return flag;
	}
	
}	
