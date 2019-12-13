package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.mysql.jdbc.PreparedStatement;

import jdbc.DBUtils;

public class CheckUserName {
	
	public static boolean checkusername(String username,String password) throws SQLException 
	{
		boolean flag = true;
		Connection conn = DBUtils.getConnection();
		String sql  = "select count(*) from userinfo where username='"+username+"' and password='"+password+"'";
		Statement st = conn.createStatement();
		ResultSet rs = st.executeQuery(sql);
		if(rs.next()) 
		{
			if(rs.getInt(1) == 1) 
			{
				flag = true;
			}else 
			{
				flag = false;
			}
		}
		return flag;
	}
	
}	
