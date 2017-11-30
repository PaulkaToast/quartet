package quartet;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

interface SqlActions {
    void run(Connection conn, List<Statement> statements) throws SQLException;
}
