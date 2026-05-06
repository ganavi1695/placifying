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

  const performanceData = questions.map((q, idx) => ({
    topic: q.question,
    status: q.answer.trim().toLowerCase() === (selectedAnswers[idx] || "").trim().toLowerCase() ? "Correct" : "Incorrect"
  }));

  const prompt = `
    User is learning ${domain}. Timeline: ${timeline}.
    Quiz Results: ${JSON.stringify(performanceData)}.
    
    Task: Generate a highly technical and specific learning roadmap in JSON format with learning resources.
    - If they missed questions, prioritize those specific technical topics in Phase 1 and 2.
    - If they aced it, provide advanced project-based tasks.
    - Structure: A JSON array of phases. Each phase must contain exactly 28 technical task strings (4 tasks per day for 7 days).
    - Each task should include learning platform suggestions: reference recommended platforms like Udemy, Coursera, LeetCode, Documentation, GitHub, YouTube, etc.
    - Format each task as: "Task description - Resources: [Platform1, Platform2, Platform3]"
    - The number of phases must match the timeline (e.g., 3 months = 12 phases/weeks).
    
    CRITICAL: Return ONLY a raw JSON array of arrays. Do not include text, Markdown, or wrapper objects.
  `;

  const buildFallbackRoadmap = () => {
    const timelineMonths = Number((timeline || "3 months").split(" ")[0]) || 3;
    const phaseCount = Math.max(1, Math.min(48, timelineMonths * 4));
    const resourceSet = ["Udemy", "Coursera", "YouTube", "GitHub", "Documentation", "LeetCode"];
    const topicHint = domain.replace(/[-_]/g, ' ');

    return Array.from({ length: phaseCount }, (_, phaseIndex) => {
      return Array.from({ length: 28 }, (_, taskIndex) => {
        const resourceSample = resourceSet[(phaseIndex + taskIndex) % resourceSet.length];
        const taskNum = taskIndex + 1;
        return `Week ${phaseIndex + 1} Task ${taskNum}: Study ${topicHint} concept ${taskNum} and practice with ${resourceSample} - Resources: [${resourceSample}]`;
      });
    });
  };

  const extractJson = (text) => {
    if (!text || typeof text !== 'string') return null;

    const cleaned = text.replace(/```(?:json)?/gi, '').trim();
    try {
      return JSON.parse(cleaned);
    } catch (firstError) {
      const arrayMatch = cleaned.match(/\[[\s\S]*\]/m);
      if (arrayMatch) {
        try {
          return JSON.parse(arrayMatch[0]);
        } catch (secondError) {
          console.error('Second parse attempt failed:', secondError);
        }
      }
    }
    return null;
  };

  const timelineMonths = Number((timeline || "3 months").split(" ")[0]) || 3;
  const expectedPhaseCount = Math.max(1, Math.min(48, timelineMonths * 4));

  const isValidRoadmap = (value) => {
    return Array.isArray(value) && value.length === expectedPhaseCount && value.every(
      (phase) => Array.isArray(phase) && phase.length === 28 && phase.every((task) => typeof task === 'string')
    );
  };

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.6,
    });

    const rawContent = completion.choices[0].message.content;
    const extracted = extractJson(rawContent);

    let roadmap = extracted;

    if (!isValidRoadmap(roadmap)) {
      if (roadmap && typeof roadmap === 'object') {
        if (isValidRoadmap(roadmap.roadmap)) roadmap = roadmap.roadmap;
        else {
          const nested = Object.values(roadmap).find((value) => isValidRoadmap(value));
          if (nested) roadmap = nested;
        }
      }
    }

    if (!isValidRoadmap(roadmap)) {
      console.warn('AI roadmap invalid for timeline, using fallback. Expected', expectedPhaseCount, 'phases. Got', Array.isArray(roadmap) ? roadmap.length : typeof roadmap);
      roadmap = buildFallbackRoadmap();
    }

    return res.json(roadmap);
  } catch (error) {
    console.error("Roadmap AI Error:", error);
    return res.json(buildFallbackRoadmap());
  }
});

module.exports = router;