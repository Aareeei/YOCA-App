const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

app.post('/api/generate', async (req, res) => {
  const prompt = req.body.prompt;

  // Generate ISO date for tomorrow
  const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const isoDate = tomorrow.toISOString().split('T')[0]; // "2024-04-21"

const modifiedPrompt = `Schedule tasks for the date ${isoDate}. ${prompt}`;


const body = {
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
  You are a task planning assistant. Based on the user's request, return a list of tasks in valid JSON format.
  
  The tasks MUST be scheduled for the specific date: ${isoDate}.
  
  Each task must include:
  - title (string)
  - start (ISO 8601 datetime, e.g., "${isoDate}T09:00:00")
  - duration (in minutes)
  - priority ("high", "medium", or "low")
  
  Respond ONLY with a raw JSON array.
        `.trim()
      },
      {
        role: "user",
        content: modifiedPrompt
      }
    ],
    temperature: 0.3
  };
  

  try {
    const openaiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "YOCA"
      },
      body: JSON.stringify(body)
    });

    const data = await openaiRes.json();
    console.log("OpenRouter Response:", data);

    const raw = data.choices?.[0]?.message?.content;
    if (!raw) {
      return res.status(500).json({ error: "Invalid response", data });
    }

    res.json({ content: raw });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "OpenRouter request failed", message: err.message });
  }
});

app.listen(3001, () => {
  console.log("YOCA backend running on http://localhost:3001");
});
