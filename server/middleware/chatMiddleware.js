const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post("http://localhost:5000/chat", {
      message: userMessage,
    });

    res.json({ reply: response.data.reply });
  } catch (error) {
    console.error("Error forwarding to Python:", error.message);
    res.status(500).json({ reply: "Server error. Try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
