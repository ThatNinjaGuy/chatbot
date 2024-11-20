import "dotenv/config";

export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  pineconeApiKey: process.env.PINECONE_API_KEY,
  pineconeIndexName: process.env.PINECONE_INDEX_NAME,
  clientOrigin: "http://localhost:3000",
  serverPort: process.env.SERVER_PORT || 8080,
};
