import React from "react";
import ChatRoom from "./ChatRoom";
import { jwtDecode } from "jwt-decode";

export default function ChatPage() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <h3>Please login first.</h3>;
  }

  const decoded = jwtDecode(token);
  const username = decoded.sub;

  return <ChatRoom token={token} username={username} />;
}
