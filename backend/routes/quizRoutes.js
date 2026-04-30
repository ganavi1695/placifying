const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

// Use your existing Chatbot Groq Key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/generate", async (req, res) => {
  const { domain, difficulty = 'medium' } = req.body;
  const prompt = `Generate a JSON array of 10 ${difficulty} difficulty MCQ questions for the domain: ${domain}. 
  IMPORTANT: Do NOT include prefixes like "a)", "1.", or "b)" in options or answer fields. 
  Format: [{"question": "...", "options": ["Option A", "Option B", "Option C", "Option D"], "answer": "Option A"}].
  Respond ONLY with the raw JSON array.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
    });
    let content = completion.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
    res.json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

router.post("/analyze-and-generate", async (req, res) => {
  const { domain, questions, selectedAnswers, timeline } = req.body;

  // Analysis of performance for the AI to tailor the roadmap
  const performanceData = questions.map((q, idx) => ({
    topic: q.question,
    status: q.answer.trim().toLowerCase() === (selectedAnswers[idx] || "").trim().toLowerCase() ? "Correct" : "Incorrect"
  }));

  const prompt = `
    User is learning ${domain}. Timeline: ${timeline}.
    Quiz Results: ${JSON.stringify(performanceData)}.
    
    Task: Generate a highly technical and specific learning roadmap in JSON format.
    - If they missed questions, prioritize those specific technical topics in Phase 1 and 2.
    - If they aced it, provide advanced project-based tasks.
    - Structure: A JSON array of phases. Each phase must contain exactly 28 technical task strings (4 tasks per day for 7 days).
    - The number of phases must match the timeline (e.g., 3 months = 12 phases/weeks).
    
    CRITICAL: Return ONLY a raw JSON array of arrays: [ ["Phase 1 Task 1", "Phase 1 Task 2"...], ["Phase 2 Task 1"...] ]
    Do not include any introductory text or wrap it in a root object.
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.6,
    });

    let content = completion.choices[0].message.content.replace(/```json/g, "").replace(/```/g, "").trim();
    const roadmap = JSON.parse(content);
    
    // Ensure we send back an array to prevent .flat() crashes
    res.json(Array.isArray(roadmap) ? roadmap : (roadmap.roadmap || []));
  } catch (error) {
    console.error("Roadmap AI Error:", error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

module.exports = router;