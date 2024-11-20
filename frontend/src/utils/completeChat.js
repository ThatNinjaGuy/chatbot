const SERVER_HOST = process.env.REACT_APP_SERVER_HOST || "http://localhost";
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || "8080";

export async function completeChat(input) {
  try {
    const response = await fetch(
      `${SERVER_HOST}:${SERVER_PORT}/api/complete-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.message; // Adjust based on actual server response structure
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
}
