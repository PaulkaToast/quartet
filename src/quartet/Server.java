package quartet;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class Server {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", new MainPageHandler());
        server.createContext("/frontend-bundle.js", new JavaScriptHandler());
        server.createContext("/sounds", new SoundFileHandler());
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
        he.sendResponseHeaders(code, response.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    public static String readFile(String filePath) throws IOException {
        byte[] content = Files.readAllBytes(Paths.get(filePath));
        return new String(content);
    }

    public static void sendFileAsResponse(HttpExchange he, String filePath) throws IOException {
        long contentLength = Files.size(Paths.get(filePath));
        he.sendResponseHeaders(200, contentLength);
        OutputStream os = he.getResponseBody();
        FileInputStream is = new FileInputStream(new File(filePath));
        byte buffer[] = new byte[2048];
        int count;
        while ((count = is.read(buffer)) != -1) {
            os.write(buffer, 0, count);
        }
        os.close();

    }

    public static String readToString(InputStream is) throws IOException {
        String str = "";
        int c;
        while ( (c = is.read()) != -1 ) str += (char) c;
        return str;
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
        String error = "Error not specified";

        boolean parse(Map<String, String> query) {
            String value;

            value = query.get("row");
            if (value == null) { error = "No row value"; return false; }
            else try { row = Integer.parseInt(value); }
            catch (NumberFormatException ex) { error = "Row value invalid"; return false; }


            value = query.get("col");
            if (value == null) { error = "No column value"; return false; }
            else try { col = Integer.parseInt(value); }
            catch (NumberFormatException ex)  { error = "Column value invalid"; return false; }

            value = query.get("toggle");
            if (value == null)  { error = "No toggle value"; return false; }
            else if (value.equals("true")) toggle = true;
            else if (value.equals("false")) toggle = false;
            else  { error = "Invalid toggle value"; return false; }

            return true;
        }
    }

    static class PageState {
        boolean noteToggle[][] = new boolean[8][8];

        void add(StateChange change) {
            noteToggle[change.row][change.col] = change.toggle;
        }

        @Override
        public String toString() {
            return super.toString();
        }
    }

}