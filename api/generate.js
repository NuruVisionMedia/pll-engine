export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing Anthropic API key. Add ANTHROPIC_API_KEY in Vercel Environment Variables."
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": apiKey
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error("PLL generate API error:", error);
    res.status(500).json({ error: error.message || "Unknown server error" });
  }
}
