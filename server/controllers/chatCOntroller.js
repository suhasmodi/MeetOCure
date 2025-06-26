const { Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) return res.status(400).json({ message: "Message is required" });

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [{ role: "user", content: message }],
    });

    const reply = response.data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI response failed" });
  }
};

module.exports = { chatWithAI };