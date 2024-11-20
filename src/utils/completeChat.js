export async function completeChat(input) {
  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer xai-qGHQ2xobYZb7HpvzkVdfXEMCazh13Zjvd8QHoxUaMw6h5GAVy6UYLBYTMsaqMn5MlBoJXeo6FECmStgO",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a test assistant.",
          },
          {
            role: "user",
            content: input,
          },
        ],
        model: "grok-beta",
        stream: false,
        temperature: 0,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.choices[0].message.content; // Adjust based on actual API response structure
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
}
