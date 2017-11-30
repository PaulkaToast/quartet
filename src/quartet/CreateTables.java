package quartet;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import static quartet.SqlHelperUtils.connectToDB;
import static quartet.SqlHelperUtils.pageStateTableName;

class CreateTables implements SqlActions {
    public static void main(String args[]) {
        connectToDB(new CreateTables());
    }

    @Override
    public void run(Connection conn, List<Statement> statements) throws SQLException {
        Statement s;
        /* Creating a statement object that we can use for running various
         * SQL statements commands against the database.*/
        s = conn.createStatement();
        statements.add(s);

        // We create a table...
        s.execute("create table " + pageStateTableName + "(" +
                "id int," +
                "state varchar(64)" +
                ")"
        );
        System.out.println("Created table " + pageStateTableName);

    }
}
