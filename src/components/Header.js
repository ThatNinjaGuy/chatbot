import React from "react";

function Header({ theme, toggleTheme, isChatScreen, toggleScreen }) {
  return (
    <header className="App-header">
      <div className="App-title">Grok</div>
      <button onClick={toggleScreen} className="toggle-screen-button">
        {isChatScreen ? "Update Knowledge Base" : "Go to Chat Screen"}
      </button>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

export default Header;
