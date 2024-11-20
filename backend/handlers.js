import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "./config.js";
import fetch from "node-fetch";

// Initialize OpenAI and Pinecone clients
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

const pc = new Pinecone({
  apiKey: config.pineconeApiKey,
});

const index = pc.index(config.pineconeIndexName);

export const createEmbeddingsHandler = async (req, res) => {
  const { inputText } = req.body;
  console.log("Received request to create embeddings for:", inputText);

  try {
    if (config.mode === "actual") {
      const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: inputText,
      });

      const embedding = response.data[0].embedding;
      res.json({ embedding });
    } else {
      // Return a dummy embedding for demo purposes
      const dummyEmbedding = Array(1536).fill(0.5);
      console.log("Returning dummy embedding (demo)");
      res.json({ embedding: dummyEmbedding });
    }
  } catch (error) {
    console.error("Error creating embeddings:", error);
    res.status(500).send("Error creating embeddings");
  }
};

export const upsertVectorsHandler = async (req, res) => {
  const { vectors } = req.body;
  console.log("Received request to upsert vectors");

  try {
    if (config.mode === "actual") {
      await index.namespace("knowledge-base-test").upsert(vectors);
      res.json({ message: "Vectors upserted successfully" });
    } else {
      // Return a dummy success message for demo purposes
      console.log("Returning dummy success message for upsert (demo)");
      res.json({ message: "Vectors upserted successfully (demo)" });
    }
  } catch (error) {
    console.error("Error upserting vectors:", error);
    res.status(500).send("Error upserting vectors to Pinecone");
  }
};

export const completeChatHandler = async (req, res) => {
  const { input } = req.body;
  console.log("Received chat completion request for input:", input);

  try {
    if (config.mode === "actual") {
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.xaiApiKey}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a test assistant.",
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
      res.json({ message: data.choices[0].message.content });
    } else {
      // Return a dummy response for demo purposes
      console.log("Returning dummy chat response (demo)");
      res.json({ message: "This is a dummy response for demo purposes." });
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    res.status(500).send("Error fetching AI response");
  }
};
