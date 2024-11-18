import React from "react";

function ChatInput({ input, handleInputChange, handleKeyDown, handleSend }) {
  return (
    <footer className="App-footer">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </footer>
  );
}

export default ChatInput;
