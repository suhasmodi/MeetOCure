const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatWithOpenAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k", // or "gpt-4", "gpt-3.5-turbo"
      messages: [{ role: "user", content: message }],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ message: "OpenAI API error" });
  }
};

module.exports = { chatWithOpenAI };
