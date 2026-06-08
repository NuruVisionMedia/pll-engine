export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("Anthropic response status:", response.status);
    console.log("Anthropic response body:", text);
    
    res.status(response.status).send(text);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
