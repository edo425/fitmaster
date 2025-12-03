const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Meal Plan
router.post('/generate', auth, async (req, res) => {
    const { age, gender, weight, height, goal, dietaryPreferences } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Create a daily meal plan for a ${age} year old ${gender}, weight ${weight}kg, height ${height}cm. Goal: ${goal}. Dietary preferences: ${dietaryPreferences || 'None'}.
    Return ONLY a JSON object with this structure:
    {
      "meals": [
        {
          "type": "Breakfast",
          "name": "Oatmeal with Berries",
          "calories": 350,
          "macros": { "protein": "12g", "carbs": "60g", "fat": "6g" },
          "ingredients": ["Oats", "Blueberries", "Almond Milk"],
          "instructions": "Boil oats..."
        }
      ]
    }
    Do not include markdown formatting or backticks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const plan = JSON.parse(text);

        // TODO: Integrate Spoonacular here to fetch images for the meal names
        // const spoonacularRes = await axios.get(...)

        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
