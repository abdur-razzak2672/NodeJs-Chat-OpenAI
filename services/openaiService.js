const openai = require('openai');
const {Configuration,OpenAIApi} = require('openai'); 

const config = new Configuration({
  apiKey: "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",
})
 
 const openaiInstance = new OpenAIApi(config);

exports.generateResponse = async (prompt) => {
  try {
     console.log('Generating response from OpenAI...====', prompt);

    const response = await openaiInstance.createCompletion({
      model: 'gpt-3.5-turbo-instruct',  
      prompt: prompt,
      max_tokens:100,
     });

    res.send({ response: response.data.choices[0].text });
  } catch (error) {
    console.error('Error in OpenAI request:', error.response.data);
    res.status(500).send('Internal Server Error');
  }
};




