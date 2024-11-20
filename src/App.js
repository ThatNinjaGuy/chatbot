import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header.js";
import ChatMessage from "./components/ChatMessage.js";
import ChatInput from "./components/ChatInput.js";
import KnowledgeBase from "./components/KnowledgeBase.js";
import { completeChat } from "./utils/completeChat.js";
import { createEmbeddings } from "./utils/createEmbeddings.js";
import { upsertVectors } from "./utils/pineconeClient.js";

function App() {
  const [theme, setTheme] = useState("light");
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isChatScreen, setIsChatScreen] = useState(true);
  const [knowledgeInput, setKnowledgeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKnowledgeInputChange = (e) => {
    setKnowledgeInput(e.target.value);
  };

  const handleChatSend = async () => {
    if (input.trim() && !isLoading) {
      setChatHistory([...chatHistory, { user: "User", message: input }]);
      setInput("");
      setIsLoading(true);

      try {
        const aiResponse = await completeChat(input);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { user: "AI", message: aiResponse },
        ]);
      } catch (error) {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          {
            user: "AI",
            message: "Sorry, there was an error fetching the response.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKnowledgeBaseAction = async () => {
    if (knowledgeInput.trim()) {
      setIsLoading(true);
      try {
        // Generate embeddings using OpenAI API
        const embeddings = await createEmbeddings(knowledgeInput);

        const vectors = [
          {
            id: `vec-${Date.now()}`, // Use a unique ID for each vector
            values: embeddings, // Use the embeddings from OpenAI
            metadata: {
              genre: "unknown",
              originalText: knowledgeInput,
            },
          },
        ];

        await upsertVectors(vectors);

        setKnowledgeInput("");
      } catch (error) {
        console.error("Error generating embeddings:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      if (isChatScreen) {
        handleChatSend();
      } else {
        handleKnowledgeBaseAction();
      }
    }
  };

  const toggleScreen = () => {
    setIsChatScreen(!isChatScreen);
  };

  return (
    <div className={`App ${theme}`}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        isChatScreen={isChatScreen}
        toggleScreen={toggleScreen}
      />
      <main className="App-main">
        {isLoading && !isChatScreen ? (
          <div className="loading-screen">Loading...</div>
        ) : isChatScreen ? (
          chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))
        ) : (
          <KnowledgeBase
            knowledgeInput={knowledgeInput}
            handleKnowledgeInputChange={handleKnowledgeInputChange}
            handleKnowledgeBaseAction={handleKnowledgeBaseAction}
            handleKeyDown={handleKeyDown}
          />
        )}
      </main>
      {isChatScreen && (
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleSend={handleChatSend}
          disabled={isLoading}
        />
      )}
    </div>
  );
}

export default App;
