const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
const axios = require('axios')
const { GoogleGenerativeAI } = require("@google/generative-ai");


const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
const fs = require("fs");
const readline = require('readline');
// const genAI = new GoogleGenerativeAI("AIzaSyBeoLcugaOhhP14-0hTG4ZQfIcSFibHjF8");
const genAI = new GoogleGenerativeAI(env.config().parsed.API_KEY);



const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat({
    history: [], // Start with an empty history
    generationConfig: {
    maxOutputTokens: 500,
},
});

app.get('/',(req , res) => {
    res.send("Hello bitch")
    console.log(" this is working ")
})

app.post('/api/process', async(req , res) => {
    
    const userInput = req.body.input;

    try {
        const result = await chat.sendMessage(userInput);
        const data = result.response.text();
        res.json({data : data});
    } catch (error){
        res.status(500).send('Error Processing the Data')
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});