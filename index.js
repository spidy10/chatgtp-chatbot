const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// OpenAI API setup
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY',
});

const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 150,
            temperature: 0.7,
        });
        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Chatbot server is running on http://localhost:5000');
});
