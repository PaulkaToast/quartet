var webSocket = new WebSocket("ws://" + location.hostname + ";" + location.port + "/chat");
webSocket.onmessage = function (msg) {updateChat(msg);};
webSocket.onclose = function () {alert("Websocket connection closed")};

id("send").addEventListener("click", function(){ sendMessage(id("message").value);
});

id("message").addEventListener("Keypress", function (e) {
    if(e.keyCode == 13) { sendMessage(e.target.value);}
});

function sendMessage(message) {
    if(message !== ""){
            webSocket.send(message);
            id("message").value = "";
    }
}

function updateChat(msg) {
    var data = JSON.parse(msg.data);
    insert("chat". data.userMessage);
    id("userlist").innerHTML = "";
    data.userlist.forEach(function (user) {
        insert("user-list", "<li>" + user + "</li>");
    });
}

function insert(targetId, message) {
    id(targetId).insertAdjacentHTML("afterbegin", message)
}

function id(id) {
    return document.getElementById(id);
}