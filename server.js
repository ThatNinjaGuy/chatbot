import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your server environment
});

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

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
