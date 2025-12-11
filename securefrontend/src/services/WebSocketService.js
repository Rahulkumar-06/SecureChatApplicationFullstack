import { Client } from "@stomp/stompjs";

class WebSocketService {
  stompClient = null;

  connect(token, onConnected, onError) {
    this.stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws", 
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      onConnect: onConnected,
      onStompError: onError
    });

    this.stompClient.activate();
  }

  subscribe(destination, callback) {
    if (this.stompClient) {
      this.stompClient.subscribe(destination, callback);
    }
  }

  send(destination, body) {
    if (this.stompClient) {
      this.stompClient.publish({
        destination,
        body: JSON.stringify(body)
      });
    }
  }
}

export default new WebSocketService();
