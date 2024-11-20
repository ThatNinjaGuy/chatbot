import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey:
    "pcsk_6Pf8Lq_41dcbcDtgq22phasWk8nvgE26eGJDmHqRWX9fzkbaWG2WYZ44v7NhzbxQETPv5e", // Replace with your Pinecone API key
});

const index = pc.index("resume-analyzer"); // Replace 'quickstart' with your actual index name

export async function upsertVectors(vectors) {
  try {
    await index.namespace("knowledge-base-test").upsert(vectors);
    console.log("Vectors upserted successfully");
  } catch (error) {
    console.error("Error upserting vectors:", error);
  }
}
