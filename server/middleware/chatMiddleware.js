const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Enable CORS for frontend
app.use(cors({
  origin: "https://meet-o-cure-3pznp8uhd-oneterabyte7s-projects.vercel.app",
}));
app.use(express.json());

// Proxy to Python backend
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post("https://meetocure.onrender.com/ai-chat", {
      message: userMessage,
    });

    res.json({
      reply: response.data.answer,
      success: true,
      sources: response.data.sources || [],
    });

  } catch (error) {
    console.error("Error forwarding to Python:", error.message);
    res.status(500).json({
      reply: "⚠️ Error contacting AI server.",
      success: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
