export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing ANTHROPIC_API_KEY environment variable"
      });
    }

    const response = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "x-api-key": apiKey
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic Error:", data);

      return res.status(response.status).json({
        error: data.error?.message || "Anthropic request failed"
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: error.message || "Unknown server error"
    });
  }
}
