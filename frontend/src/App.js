import React, { useState } from 'react';
import { apiCall } from './api';
import './styles/styles.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a football coach assistant.' }
  ]);
  const [score, setScore] = useState('');
  const [mood, setMood] = useState('');
  const [domicile, setDomicile] = useState(false);
  const [adversaire, setAdversaire] = useState('');

  const handleSendMessage = async () => {
    const newMessage = { role: 'user', content: message };
    const updatedMessages = [...messages, newMessage];

    try {
      const response = await apiCall('/chat', 'POST', { messages: updatedMessages });
      const assistantMessage = { role: 'assistant', content: response.message };
      setMessages([...updatedMessages, assistantMessage]);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveScore = async () => {
    try {
      const response = await apiCall('/scores', 'POST', { score, mood, domicile, adversaire });
      alert(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Football Coach Bot</h1>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
      </div>
      <div>
        <button
          onClick={handleSendMessage}
          style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
        >
          Send Message
        </button>
      </div>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Conversation History:</h2>
        <div>
          {messages
            .filter(msg => msg.role !== 'system') // Filtrer les messages du système
            .map((msg, index) => (
              <p key={index} style={{ color: msg.role === 'user' ? 'blue' : 'green' }}>
                <strong>{msg.role === 'user' ? 'User: ' : 'Assistant: '}</strong>
                {msg.content}
              </p>
            ))}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Save Match Score</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Adversaire"
            value={adversaire}
            onChange={(e) => setAdversaire(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Domicile:
            <input
              type="checkbox"
              checked={domicile}
              onChange={(e) => setDomicile(e.target.checked)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div>
          <button
            onClick={handleSaveScore}
            style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
          >
            Save Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
