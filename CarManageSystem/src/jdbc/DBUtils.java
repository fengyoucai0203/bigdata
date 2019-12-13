package jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DBUtils {
	private static final String URL="jdbc:mysql://localhost:3306/car";
	private static final String NAME="root";
	private static final String PASSWORD="rootroot";
	private static Connection conn=null;
	static{
		try {
				Class.forName("com.mysql.jdbc.Driver");
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				}
			}
	
	public static Connection getConnection(){
		try {
			conn = DriverManager.getConnection(URL, NAME, PASSWORD);
			return conn;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public static void close(Connection con, Statement stat, ResultSet rs)
	{
			try {
				if (rs != null)
					rs.close();
				if (stat != null)
					stat.close();
				if (con != null)
					con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	public static void close(Connection con, Statement stat)
	{
		close(con,stat,null);
	}
}
