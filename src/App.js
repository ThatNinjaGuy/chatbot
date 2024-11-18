import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

function App() {
  const [theme, setTheme] = useState("light");
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim()) {
      setChatHistory([...chatHistory, { user: "User", message: input }]);
      setInput("");

      try {
        const response = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization:
            //   "Bearer xai-qGHQ2xobYZb7HpvzkVdfXEMCazh13Zjvd8QHoxUaMw6h5GAVy6UYLBYTMsaqMn5MlBoJXeo6FECmStgO",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: "Answer my questions as best as you can.",
              },
              {
                role: "user",
                content: input,
              },
            ],
            model: "grok-beta",
            stream: false,
            temperature: 0,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { user: "AI", message: data.choices[0].message.content },
        ]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            user: "AI",
            message: "Sorry, there was an error fetching the response.",
          },
        ]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="App-main">
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </main>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSend={handleSend}
      />
    </div>
  );
}

export default App;
