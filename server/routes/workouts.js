const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Workout Plan
router.post('/generate', auth, async (req, res) => {
    const { age, gender, weight, height, fitnessLevel, goal } = req.body;

    try {
        // 1. Generate Plan Skeleton with AI
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Create a weekly workout plan for a ${age} year old ${gender}, weight ${weight}kg, height ${height}cm. Fitness level: ${fitnessLevel}. Goal: ${goal}.
    Return ONLY a JSON object with this structure:
    {
      "weekly_schedule": [
        {
          "day": "Monday",
          "focus": "Chest and Triceps",
          "exercises": ["Bench Press", "Incline Dumbbell Press", "Tricep Dips"]
        }
      ]
    }
    Do not include markdown formatting or backticks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const plan = JSON.parse(text);

        // 2. Fetch Details from ExerciseDB (Mock implementation for now, real one would loop through exercises)
        // In a real app, we would search ExerciseDB for each exercise to get the GIF/Video.
        // For this MVP, we will return the AI plan directly, and the frontend can fetch details or we can do it here.
        // Let's try to fetch for the first few exercises to demonstrate.

        // Note: ExerciseDB has rate limits. We should be careful.
        // For now, we return the plan. We can enhance this to fetch metadata later.

        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
