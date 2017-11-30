package quartet;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.Map;

import static quartet.Server.*;

class MainPageHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {

        Headers reqHeaders = he.getRequestHeaders();
        Headers resHeaders = he.getResponseHeaders();

        switch (he.getRequestMethod()) {
            case "POST":
                Map<String, String> data = parseQuery(readToString(he.getRequestBody()));
                if (data.containsKey("signup")) {
                    UserSession userSession = new UserSession(0);
                    sessionList.add(userSession);
                    resHeaders.set("Set-Cookie", "session=" + userSession.token);
                    showApp(he);
                    return;
                }
                break;
            case "GET":
                String cookie = reqHeaders.getFirst("Cookie");
                if (cookie == null) break;
                String comp[] = cookie.split("=");
                if (comp.length < 2 || !comp[0].equals("session")) break;
                String token = comp[1];
                for (UserSession userSession : sessionList) {
                    if ( userSession.token.equals(token) ) {
                        showApp(he);
                        return;
                    }
                }
                break;
            default:
                sendResponse(he, 405, "Request method not allowed");
                return;
        }

        showLogin(he);
    }

    void showLogin(HttpExchange he) throws IOException {
        Headers resHeaders = he.getResponseHeaders();
        //resHeaders.set("Set-Cookie", "session=abcdefg");
        resHeaders.set("Content-Type", "text/html");
        String response = readFile("login.html");
        sendResponse(he, 200, response);

    }

    void showApp(HttpExchange he) throws IOException {
        Headers resHeaders = he.getResponseHeaders();
        resHeaders.set("Content-Type", "text/html");
        String response = readFile("index.html");
        sendResponse(he, 200, response);

    }
}