import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import { Pinecone } from "@pinecone-database/pinecone";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pc.index(process.env.PINECONE_INDEX_NAME);

app.post("/api/create-embeddings", async (req, res) => {
  const { inputText } = req.body;

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: inputText,
    });

    const embedding = response.data[0].embedding;
    res.json({ embedding });
  } catch (error) {
    console.error("Error creating embeddings:", error);
    res.status(500).send("Error creating embeddings");
  }
});

app.post("/api/upsert-vectors", async (req, res) => {
  const { vectors } = req.body;

  try {
    await index.namespace("knowledge-base-test").upsert(vectors);
    res.json({ message: "Vectors upserted successfully" });
  } catch (error) {
    console.error("Error upserting vectors:", error);
    res.status(500).send("Error upserting vectors to Pinecone");
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
