package quartet;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.Map;

import static quartet.Server.*;

class PageStateHandler implements HttpHandler {

    PageState pageState = new PageState();

    @Override
    public void handle(HttpExchange t) throws IOException {
        String response = "";
        int responseCode = 200;
        switch (t.getRequestMethod()) {
            case "GET":
                response = getPageState().toString();
                break;
            case "PUT":
                StateChange change = new StateChange();
                Map<String, String> query = parseQuery(t.getRequestBody().toString());
                if ( change.parse(query) ) {
                    pageState.add(change);
                } else {
                    responseCode = 400;
                    response = "Malformed request body";
                }
                break;
            default:
                responseCode = 405;
                response = "Request method not allowed";
        }

        sendResponse(t, responseCode, response);
    }

    public PageState getPageState() throws IOException {
        return pageState;
    }

    public void updatePageState(StateChange change) {
        pageState.add(change);
    }
}