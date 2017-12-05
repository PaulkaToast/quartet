package quartet;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import static quartet.SqlHelperUtils.*;

class CreateTables implements SqlActions {
    public static void main(String args[]) {
        initConnection();
        connectToDb(new CreateTables());
    }

    @Override
    public void run(Connection conn, List<Statement> statements) throws SQLException {
        Statement s;
        /* Creating a statement object that we can use for running various
         * SQL statements commands against the database.*/
        s = conn.createStatement();
        statements.add(s);
        s.execute("create table " + pageStateTableName + "(" +
                "id int," +
                "state varchar(" + (17 * 16) + ")" +
                ")"
        );
        System.out.println("Created table " + pageStateTableName);

        s = conn.createStatement();
        statements.add(s);
        s.execute("create table " + userTableName + "(" +
                "username varchar(128)," +
                "password varchar(128)," +
                "pageStateId int" +
                ")"
        );
        System.out.println("Created table " + userTableName);

    }
}
