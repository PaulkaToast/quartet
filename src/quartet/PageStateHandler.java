package quartet;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.Map;

import static quartet.Server.*;

class PageStateHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {
        String response = "";
        int responseCode = 200;

        Headers reqHeaders = he.getRequestHeaders();
        String token = getSessionCookie(reqHeaders);
        if (token == null) { badCookie(he); return; }

        UserSession userSession = sessionList.get(token);
        if (userSession != null) {
            PageState pageState = userSession.pageState;

            switch (he.getRequestMethod()) {
                case "GET":
                    response = pageState.toString();
                    break;
                case "PUT":
                    StateChange stateChange = new StateChange();
                    NoteChange noteChange = new NoteChange();
                    Map<String, String> query = parseQuery(readToString(he.getRequestBody()));
                    if ( stateChange.parse(query) ) {
                        pageState.add(stateChange);
                    } else if ( noteChange.parse(query) ) {
                        pageState.add(noteChange);
                    } else {
                        responseCode = 400;
                        response = "Malformed request body: " + stateChange.error;
                    }
                    break;
                default:
                    responseCode = 405;
                    response = "Request method not allowed";
            }
        }
        sendResponse(he, responseCode, response);
    }

    public void badCookie(HttpExchange he) throws IOException {
        Headers resHeaders = he.getResponseHeaders();
        resHeaders.set("Content-Type", "text/plain");
        sendResponse(he, 404, "Invalid session");
    }
}