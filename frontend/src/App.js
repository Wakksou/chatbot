import React, { useState } from 'react';
import { apiCall } from './api';
import './styles/styles.css';
import aiProfilePic from './assets/ai_profile.jpg'; 

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Tu es un coach senior de football. Réponds comme si tu communiquais avec ton élève et considère toi comme faisant partie de son equipe.'  }
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
    <div className="container">
      <h1>Football Coach Bot</h1>
      <div className="chat-container">
        <div className="messages">
          {messages
            .filter(msg => msg.role !== 'system')
            .map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="profile-pic">
                    <img src={aiProfilePic} alt="AI" />
                  </div>
                )}
                <div className="message-content">
                  <strong>{msg.role === 'user' ? 'You: ' : 'Coach: '}</strong>
                  {msg.content}
                </div>
              </div>
            ))}
        </div>
        <div className="input-container">
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="2"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div className="save-score">
        <h2>Save Match Score</h2>
        <input
          type="text"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <input
          type="text"
          placeholder="Adversaire"
          value={adversaire}
          onChange={(e) => setAdversaire(e.target.value)}
        />
        <label>
          Domicile:
          <input
            type="checkbox"
            checked={domicile}
            onChange={(e) => setDomicile(e.target.checked)}
          />
        </label>
        <button onClick={handleSaveScore}>Save Score</button>
      </div>
    </div>
  );
};

export default App;
