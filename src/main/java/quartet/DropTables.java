package quartet;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import static quartet.SqlHelperUtils.*;

class DropTables implements SqlActions {
    public static void main(String args[]) {
        initConnection();
        connectToDb(new DropTables());
    }

    @Override
    public void run(Connection conn, List<Statement> statements) throws SQLException {
        Statement s;
        /* Creating a statement object that we can use for running various
             * SQL statements commands against the database.*/
        s = conn.createStatement();
        statements.add(s);

        // delete the tables
        s.execute("drop table " + pageStateTableName);
        System.out.println("Dropped table " + pageStateTableName);

        s = conn.createStatement();
        statements.add(s);

        s.execute("drop table " + userTableName);
        System.out.println("Dropped table " + userTableName);
    }
}
