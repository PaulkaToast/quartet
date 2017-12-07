package quartet;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;

import static quartet.Server.*;

class JavaScriptHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {
        he.getResponseHeaders().set("Content-Type", "application/javascript");
        String response = readFile("frontend-bundle.js");
        sendResponse(he, 200, response);
    }
}