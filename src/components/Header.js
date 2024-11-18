import React from "react";

function Header({ theme, toggleTheme }) {
  return (
    <header className="App-header">
      <div className="App-title">Grok</div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

export default Header;
