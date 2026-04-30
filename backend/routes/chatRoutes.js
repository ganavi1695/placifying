const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

// Initialize Groq with the key from your .env
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  // Basic validation to ensure message exists
  if (!message) {
    return res.status(400).json({ error: "Message content is required" });
  }

  try {
    const completion = await groq.chat.completions.create({
      // "llama-3.1-8b-instant" is free, fast, and very capable
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are an educational chatbot. Answer only about programming, courses, and student learning. If a user asks something else, politely redirect them to educational topics."
        },
        {
          role: "user",
          content: message
        }
      ],
      // Optional: limit response length to save tokens
      max_tokens: 500,
      temperature: 0.7
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    // Log the full error for your debugging
    console.error("AI Service Error:", error);

    // Send a user-friendly message to the frontend
    res.status(500).json({ 
      error: "The AI service is currently unavailable. Please try again later.",
      details: error.message 
    });
  }
});

module.exports = router;