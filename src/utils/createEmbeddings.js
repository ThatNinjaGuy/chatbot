const SERVER_HOST = process.env.REACT_APP_SERVER_HOST || "http://localhost";
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || "8080";

export const createEmbeddings = async (inputText) => {
  try {
    const response = await fetch(
      `${SERVER_HOST}:${SERVER_PORT}/api/create-embeddings`,
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
