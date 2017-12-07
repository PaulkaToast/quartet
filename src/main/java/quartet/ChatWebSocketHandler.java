package quartet;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

@WebSocket
public class ChatWebSocketHandler {
    private String sender, msg;

    @OnWebSocketConnect
    public void onConnect(Session user)throws Exception{
        String username = "User" + Server.nextUserNumber++;
        Server.userUsernameMap.put((Session) user, username);
        Server.broadcastMessage(sender = "Server", msg = (username + " joined the chat"));
    }

    @OnWebSocketClose
    public void onClose(Session user, int statusCode, String reason) {
            String username = Server.userUsernameMap.get(user);
            Server.userUsernameMap.remove(user);
            Server.broadcastMessage(sender = "Server", msg = (username +"Left the chat." ));
    }

    @OnWebSocketMessage
    public void onMessage(Session user, String message){
            Server.broadcastMessage(sender = Server.userUsernameMap.get(user),msg = message);
    }

}
