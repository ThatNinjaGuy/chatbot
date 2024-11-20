const SERVER_HOST = process.env.REACT_APP_SERVER_HOST || "http://localhost";
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || "8080";

export async function upsertVectors(vectors) {
  try {
    const response = await fetch(
      `${SERVER_HOST}:${SERVER_PORT}/api/upsert-vectors`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vectors }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upsert vectors");
    }

    console.log("Vectors upserted successfully");
  } catch (error) {
    console.error("Error upserting vectors:", error);
  }
}
