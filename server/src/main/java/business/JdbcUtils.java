package business;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class JdbcUtils {

    private static final String JDBC_COALITION = "jdbc/Coalition";

    private static DataSource dataSource;

    public static Connection getConnection() {
        if (dataSource == null) {
            dataSource = getDataSource(JDBC_COALITION);
        }
        try {
            return dataSource.getConnection();
        } catch (SQLException e) {
            throw new CoalitionDbException.CoalitionConnectionDbException("Encountered a SQL issue getting a connection", e);
        }
    }

    private static DataSource getDataSource(String dataSourceName) {
        try {
            InitialContext initialContext = new InitialContext();
            Context context = (Context) initialContext.lookup("java:comp/env");
            return (DataSource) context.lookup(dataSourceName);
        } catch (NamingException e) {
            throw new IllegalArgumentException("Encountered an issue establishing an initial JNDI context", e);
        }
    }
}
