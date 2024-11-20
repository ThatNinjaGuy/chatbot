import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "./config.js";

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
    // Uncomment the following lines to use the actual API
    /*
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: inputText,
    });

    const embedding = response.data[0].embedding;
    res.json({ embedding });
    */

    // Return a dummy embedding for demo purposes
    const dummyEmbedding = Array(1536).fill(0.5); // Example dummy embedding
    console.log("Returning dummy embedding (demo)");
    res.json({ embedding: dummyEmbedding });
  } catch (error) {
    console.error("Error creating embeddings:", error);
    res.status(500).send("Error creating embeddings");
  }
};

export const upsertVectorsHandler = async (req, res) => {
  const { vectors } = req.body;
  console.log("Received request to upsert vectors");

  try {
    // Uncomment the following lines to use the actual API
    /*
    await index.namespace("knowledge-base-test").upsert(vectors);
    res.json({ message: "Vectors upserted successfully" });
    */

    // Return a dummy success message for demo purposes
    console.log("Returning dummy success message for upsert (demo)");
    res.json({ message: "Vectors upserted successfully" });
  } catch (error) {
    console.error("Error upserting vectors:", error);
    res.status(500).send("Error upserting vectors to Pinecone");
  }
};
