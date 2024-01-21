// index.js
const express = require('express');
 const bodyParser = require('body-parser');
 const dbConfig = require('./db');
 const studentRoutes = require('./routes/student.routes');
 const authRoutes = require('./routes/auth.routes');
//  const openAiRoutes = require('./routes/openAi.routes');
 const cors = require('cors');
const app = express();
const {Configuration,OpenAIApi} = require('openai'); 

const config = new Configuration({
  apiKey: "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",
})
 
 const openaiInstance = new OpenAIApi(config);
const port = process.env.PORT || 3000;
 
dbConfig();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', studentRoutes,authRoutes

);app.post('/api/v1/openai', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Generating response from OpenAI...', prompt);

    const response = await openaiInstance.createCompletion({
      model: 'gpt-3.5-turbo-instruct', // Use a currently supported model
      prompt: prompt,
      max_tokens:100,
     });

    res.send({ response: response.data.choices[0].text });
  } catch (error) {
    console.error('Error in OpenAI request:', error.response.data);
    res.status(500).send('Internal Server Error');
  }
});






 
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
