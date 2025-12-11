import React from "react";

export default function ChatInput({ message, setMessage, sendMessage }) {
  return (
    <div className="chat-input-bar">

      <input
        type="text"
        className="chat-input-box"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button className="send-btn" onClick={sendMessage}>
        ➤
      </button>
    </div>
  );
}
