export const createEmbeddings = async (inputText) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/create-embeddings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create embeddings");
    }

    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.error("Error creating embeddings:", error);
    throw error;
  }
};
