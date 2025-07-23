const axios = require("axios");

const chatWithFlaskAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Forward to Flask chatbot backend
    const flaskResponse = await axios.post("https://chatbot-de6r.onrender.com/ai-chat", {
      message,
    });

    // Structure expected by React ChatAI
    return res.status(200).json({
      answer: flaskResponse.data.answer || "No response from AI.",
      success: flaskResponse.data.success,
      sources: flaskResponse.data.sources || [],
    });

  } catch (error) {
    console.error("Error communicating with Flask chatbot.py:", error.message);
    res.status(500).json({ 
      message: "Flask AI service error", 
      error: error.message 
    });
  }
};

module.exports = { chatWithFlaskAI };
