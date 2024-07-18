const { fetchChatResponse } = require('../services/chatService');

exports.handleChat = async (req, res) => {
  const { messages } = req.body;

  console.log('Received /chat request with messages:', messages);

  try {
    const { advice, filePath } = await fetchChatResponse(messages, req.app.locals.db);
    res.status(200).json({ message: advice, jsonFile: filePath });
  } catch (error) {
    console.error('Error handling /chat request:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};

exports.saveScore = async (req, res, db) => {
  const { score, mood, domicile, adversaire } = req.body;
  const query = 'INSERT INTO createdat (score, mood, domicile, adversaire) VALUES (?, ?, ?, ?)';

  db.query(query, [score, mood, domicile, adversaire], (err, results) => {
    if (err) {
      console.error('Failed to save score:', err);
      res.status(500).json({ error: 'Failed to save score.' });
    } else {
      res.status(201).json({ message: 'Score saved successfully.' });
    }
  });
};
