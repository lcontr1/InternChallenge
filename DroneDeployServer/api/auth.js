const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.API_KEY;
require('dotenv').config({ path: './.env' });

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";
console.log(prompt)
//GET
router.get("/", async (req, res, next) => {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        console.log("hello?");
        res.send(result)
    } catch (error) {
        console.error(error);
        next(error);
    }
    

});

module.exports = router;
