import React from "react";

function ChatInput({
  input,
  handleInputChange,
  handleKeyDown,
  handleSend,
  disabled,
}) {
  return (
    <footer className="App-footer">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled}>
        Send
      </button>
    </footer>
  );
}

export default ChatInput;
