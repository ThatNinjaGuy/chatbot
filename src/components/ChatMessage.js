import React from "react";
import ReactMarkdown from "react-markdown";

function ChatMessage({ chat }) {
  return (
    <div className={`chat-message ${chat.user}`}>
      <strong>{chat.user}:</strong>
      <ReactMarkdown>{chat.message}</ReactMarkdown>
    </div>
  );
}

export default ChatMessage;
