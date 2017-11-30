package quartet;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.File;
import java.io.IOException;

import static quartet.Server.sendFileAsResponse;
import static quartet.Server.sendResponse;

class ImageHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange he) throws IOException {
        String uri = he.getRequestURI().toString();
        String fileName = uri.substring(uri.lastIndexOf("/"));
        if ( new File("images/" + fileName).exists() ) {
            he.getResponseHeaders().set("Content-Type", "text/plain");
            sendFileAsResponse(he, "images/" + fileName);
        } else {
            he.getResponseHeaders().set("Content-Type", "image/png");
            sendResponse(he, 404, "Sound file does not exist");
        }
    }
}
