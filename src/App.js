import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import KnowledgeBase from "./components/KnowledgeBase";
import { completeChat } from "./utils/completeChat";
// import { createEmbeddings } from "./utils/createEmbeddings";
import { upsertVectors } from "./utils/pineconeClient";

function App() {
  const [theme, setTheme] = useState("light");
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isChatScreen, setIsChatScreen] = useState(true);
  const [knowledgeInput, setKnowledgeInput] = useState("");

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
    if (input.trim()) {
      setChatHistory([...chatHistory, { user: "User", message: input }]);
      setInput("");

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
      }
    }
  };

  const handleKnowledgeBaseAction = async () => {
    if (knowledgeInput.trim()) {
      try {
        // Temporarily using dummy data while embeddings API is not working
        // const embeddings = await createEmbeddings(knowledgeInput);
        // console.log("Generated embeddings:", embeddings);

        // Create dummy embedding vector (1024 dimensions with random values)
        const dummyEmbedding = Array(50)
          .fill(0)
          .map(() => Math.random());

        const vectors = [
          {
            id: "vec1",
            values: dummyEmbedding,
            metadata: { genre: "unknown" },
          },
        ];

        await upsertVectors(vectors);

        setKnowledgeInput("");
      } catch (error) {
        console.error("Error generating embeddings:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
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
        {isChatScreen ? (
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
        />
      )}
    </div>
  );
}

export default App;
