import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";

export default function ChatMessages({ messages, username }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-messages-box">

      {messages.map((msg, i) => (
        <div
          key={i}
          className={`message-row ${msg.sender === username ? "message-right" : "message-left"}`}
        >
          <div className={`bubble ${msg.sender === username ? "bubble-me" : "bubble-other"}`}>
            <div className="msg-meta">
              {msg.sender} • {dayjs(msg.timestamp).format("HH:mm")}
            </div>
            {msg.content}
          </div>
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
