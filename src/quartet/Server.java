package quartet;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

public class Server {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", new MainPageHandler());
        server.createContext("/frontend-bundle.js", new JavaScriptHandler());
        server.createContext("/state", new PageStateHandler());
        server.setExecutor(null);
        server.start();
    }

    public static Map<String, String> parseQuery(String query) throws UnsupportedEncodingException {
        Map<String, String> map = new HashMap<>();
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            int index = pair.indexOf("=");
            map.put(URLDecoder.decode(pair.substring(0, index), "UTF-8"), URLDecoder.decode(pair.substring(index + 1), "UTF-8"));
        }
        return map;
    }

    public static void sendResponse(HttpExchange he, int code, String response) throws IOException {
        he.sendResponseHeaders(code, response.length());
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    public static String readFile(String filePath) throws IOException {
        FileReader fileReader = new FileReader(filePath);
        BufferedReader buffer = new BufferedReader(fileReader);
        String response = "";
        String line;
        while ( ( line = buffer.readLine() ) != null ) {
            response += line + "\n";
        }
        return response;
    }

    static class MainPageHandler implements HttpHandler {

        @Override
        public void handle(HttpExchange he) throws IOException {
            he.getResponseHeaders().set("Content-Type", "text/html");
            String response = readFile("index.html");
            sendResponse(he, 200, response);
        }
    }

    static class StateChange {
        int row;
        int col;
        boolean toggle;

        boolean parse(Map<String, String> query) {
            String value;

            value = query.get("row");
            if (value == null) return false;
            else try { row = Integer.parseInt(value); }
            catch (NumberFormatException ex) { return false; }


            value = query.get("col");
            if (value == null) return false;
            else try { col = Integer.parseInt(value); }
            catch (NumberFormatException ex) { return false; }

            value = query.get("toggle");
            if (value == null) return false;
            else if (value.equals("true")) toggle = true;
            else if (value.equals("false")) toggle = false;
            else return false;

            return true;
        }
    }

    static class PageState {
        boolean noteToggle[][];

        void add(StateChange change) {
            noteToggle[change.row][change.col] = change.toggle;
        }

        @Override
        public String toString() {
            return super.toString();
        }
    }

}