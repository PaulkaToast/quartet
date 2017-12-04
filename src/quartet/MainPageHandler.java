package quartet;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static quartet.Server.*;
import static quartet.SqlHelperUtils.connectToDb;
import static quartet.SqlHelperUtils.userTableName;

class MainPageHandler implements HttpHandler {

    class UserData {
        boolean exists = false;
        int pageStateId;
    }

    @Override
    public void handle(HttpExchange he) throws IOException {

        Headers reqHeaders = he.getRequestHeaders();
        Headers resHeaders = he.getResponseHeaders();

        final UserData userData = new UserData();

        String signInError = null;
        String signUpError = null;

        switch (he.getRequestMethod()) {
            case "POST":
                Map<String, String> data = parseQuery(readToString(he.getRequestBody()));
                if (data.containsKey("signup") && data.containsKey("username") &&
                        data.containsKey("password") && data.containsKey("cpassword"))
                {

                    if ( !data.get("password").equals(data.get("cpassword")) ) {
                        signUpError = "Error: Password and confirmed password do not match";
                        break;
                    } else if ( data.get("username").length() < 4 ) {
                        signUpError = "Error: Username must be at least 4 characters in length";
                        break;
                    } else if ( data.get("password").length() < 8 ) {
                        signUpError = "Error: Password must be at least 8 characters in length";
                        break;
                    }

                    connectToDb((Connection conn, List<Statement> statements) -> {
                        PreparedStatement s = conn.prepareStatement(
                                "SELECT * FROM " + userTableName + " WHERE username=?"
                        );
                        statements.add(s);

                        s.setString(1, data.get("username"));
                        ResultSet rs = s.executeQuery();

                        userData.exists = rs.next();
                    });

                    if (userData.exists) {
                        signUpError = "Error: Username already exists";
                    } else {

                        PageState ps = new PageState();
                        pageStateList.add(ps);
                        final int pageStateId = pageStateList.size() - 1;

                        connectToDb((Connection conn, List<Statement> statements) -> {

                            PreparedStatement s = conn.prepareStatement(
                                    "INSERT INTO " + userTableName + " VALUES (?, ?, ?)"
                            );
                            statements.add(s);

                            s.setString(1, data.get("username"));
                            s.setString(2, data.get("password"));
                            s.setInt(3, pageStateId);

                            s.executeUpdate();
                        });

                        startUserSession(he, pageStateId);
                        return;
                    }
                }
                else if (data.containsKey("signout"))
                {
                    String token = getSessionCookie(reqHeaders);
                    if (token != null && sessionList.containsKey(token)) sessionList.remove(token);
                    resHeaders.set("Set-Cookie", "session=null; Expires=Tue, 1 Jan 1980 00:00:00 GMT");
                }
                else if (data.containsKey("signin") && data.containsKey("username") && data.containsKey("password"))
                {
                    connectToDb((Connection conn, List<Statement> statements) -> {
                        PreparedStatement s = conn.prepareStatement(
                                "SELECT pageStateId FROM " + userTableName + " WHERE username=? AND password=?"
                        );
                        statements.add(s);

                        s.setString(1, data.get("username"));
                        s.setString(2, data.get("password"));

                        ResultSet rs = s.executeQuery();

                        userData.exists = rs.next();

                        if (userData.exists) {
                            userData.pageStateId = rs.getInt(1);
                            rs.close();
                        }
                    });

                    if (userData.exists) {
                        startUserSession(he, userData.pageStateId);
                        return;
                    } else {
                        signInError = "Error: Invalid login information";
                    }
                }
                break;
            case "GET":
                String token = getSessionCookie(reqHeaders);
                if (token == null) break;
                UserSession userSession = sessionList.get(token);
                if (userSession != null) {
                    showApp(he);
                    return;
                }
                break;
            default:
                sendResponse(he, 405, "Request method not allowed");
                return;
        }

        showLogin(he, signInError, signUpError);
    }

    void startUserSession(HttpExchange he, int pageStateId) throws IOException {
        Headers resHeaders = he.getResponseHeaders();
        UserSession userSession = new UserSession(pageStateId);
        String token = UUID.randomUUID().toString();
        sessionList.put(token, userSession);
        resHeaders.set("Set-Cookie", "session=" + token);
        showApp(he);
    }

    void showLogin(HttpExchange he, String signInError, String signUpError) throws IOException {
        Headers resHeaders = he.getResponseHeaders();
        resHeaders.set("Content-Type", "text/html");
        String response = readFile("login.html");
        if (signInError != null) {
            response = response.replace("<signinerror />", signInError);
        }
        if (signUpError != null) {
            response = response.replace("<signuperror />", signUpError);
        }
        sendResponse(he, 200, response);

    }

    void showApp(HttpExchange he) throws IOException {
        Headers resHeaders = he.getResponseHeaders();
        resHeaders.set("Content-Type", "text/html");
        String response = readFile("index.html");
        sendResponse(he, 200, response);

    }
}