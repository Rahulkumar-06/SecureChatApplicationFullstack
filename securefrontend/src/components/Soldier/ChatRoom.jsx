import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WebSocketService from "../../services/WebSocketService";
import ConnectionStatus from "./ConnectionStatus";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import axios from "axios";
import "./ChatRoom.css";

export default function ChatRoom({ token, username }) {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const { receiver } = useParams();
  const navigate = useNavigate();

 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  useEffect(() => {
  if (!username || !receiver) return;

  axios
    .get(`http://localhost:8080/soldier/privetchat?sender=${username}&receiver=${receiver}`)
    .then((res) => {
      setChatMessages(res.data);
    })
    .catch((err) => console.error(err));
}, [receiver, username]);



  useEffect(() => {
    WebSocketService.connect(token, onConnected, onError);
  }, [token]);

  const onConnected = () => {
    setConnected(true);
    WebSocketService.subscribe("/user/queue/messages", onMessageReceived);
  };

  const onError = (err) => console.error("WebSocket error:", err);


  const onMessageReceived = (msg) => {
    const payload = JSON.parse(msg.body);

    setChatMessages((prev) =>
      [...prev, payload].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    );
  };

  
  const sendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      sender: username,
      receiver,
      content: message,
      timestamp: new Date().toISOString(),
    };

    WebSocketService.send("/app/chat.send", payload);

    setChatMessages((prev) =>
      [...prev, payload].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    );

    setMessage("");
  };

  return (
    <div className="chat-container">

      <div className="chat-header">
        <ConnectionStatus connected={connected} />
        <h4>@{receiver}</h4>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <ChatMessages messages={chatMessages} username={username} />

      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
