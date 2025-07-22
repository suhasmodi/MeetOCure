const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS only for your frontend domain
app.use(
  cors({
    origin: "https://meet-o-cure.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// Proxy POST /api/chat to your Flask backend's /chat
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Replace this URL with your Flask backend Render URL + /chat
    const flaskBackendUrl = "https://chatbot-de6r.onrender.com/ai-chat";

    const response = await axios.post(flaskBackendUrl, {
      message: userMessage,
    });

    // Forward response as-is (adjust if needed)
    res.json({
      answer: response.data.answer,
      success: response.data.success,
      sources: response.data.sources || [],
    });
  } catch (error) {
    console.error("Error forwarding to Flask backend:", error.message);
    res.status(500).json({
      answer: "Error contacting AI server.",
      success: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
