export async function createEmbeddings(text) {
  try {
    const response = await fetch("https://api.x.ai/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer xai-qGHQ2xobYZb7HpvzkVdfXEMCazh13Zjvd8QHoxUaMw6h5GAVy6UYLBYTMsaqMn5MlBoJXeo6FECmStgO",
      },
      body: JSON.stringify({
        input: [text],
        model: "v1",
        encoding_format: "float",
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.embeddings; // Adjust based on actual API response structure
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}
