package quartet;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.File;
import java.io.IOException;

import static quartet.Server.*;

class SoundFileHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange he) throws IOException {
        String uri = he.getRequestURI().toString();
        String fileName = uri.substring(uri.lastIndexOf("/"));
        if ( new File("sounds/" + fileName).exists() ) {
            String contentType = "text/plain";
            he.getResponseHeaders().set("Content-Type", contentType);
            sendFileAsResponse(he, "sounds/" + fileName);
        } else {
            he.getResponseHeaders().set("Content-Type", "text/plain");
            sendResponse(he, 404, "Sound file does not exist");
        }

    }
}
