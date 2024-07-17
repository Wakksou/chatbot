const axios = require('axios');

const fetchChatResponse = async (messages) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    max_tokens: 150
  };

  try {
    console.log('Sending request to OpenAI API...');
    const response = await axios.post(apiUrl, data, { headers });
    console.log('Received response from OpenAI API:', response.data);
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching response from OpenAI API:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch response from OpenAI API.');
  }
};

module.exports = { fetchChatResponse };
