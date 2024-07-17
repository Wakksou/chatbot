const { apiCall } = require('../utils/api');
const fs = require('fs');
const path = require('path');

const fetchChatResponse = async (messages, db) => {
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
    const response = await apiCall(apiUrl, 'POST', data, headers);
    console.log('Received response from OpenAI API:', response);
    const advice = response.choices[0].message.content.trim();

    // Create JSON object
    const adviceData = { advice };
    const jsonString = JSON.stringify(adviceData, null, 2);

    // Save JSON to file
    const filePath = path.join(__dirname, '../../advice.json');
    fs.writeFileSync(filePath, jsonString);

    // Save response to database
    const userMessage = messages[messages.length - 1].content;
    const query = 'INSERT INTO reponse (user_message, assistant_response) VALUES (?, ?)';
    db.query(query, [userMessage, advice], (err, results) => {
      if (err) {
        console.error('Failed to save response:', err);
        throw new Error('Failed to save response to database.');
      }
    });

    return { advice, filePath };
  } catch (error) {
    console.error('Error fetching response from OpenAI API:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch response from OpenAI API.');
  }
};

module.exports = { fetchChatResponse };
