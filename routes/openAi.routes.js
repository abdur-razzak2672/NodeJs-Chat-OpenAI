const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');


router.post('/openai', async (req, res) => {
    const { prompt } = req.body;
    console.log('Generating response from OpenAI...', prompt);
  
    try {
      console.log('Generating respons');

      const response = await openaiService.generateResponse(prompt);
      console.log('response', response);
      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error===' });
    }
  });

  module.exports = router;