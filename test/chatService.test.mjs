import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mysql from 'mysql2/promise';
import { fetchChatResponse } from '../backend/src/services/chatService.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
console.log("MYSQL_USER:", process.env.MYSQL_USER);
console.log("MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD);
console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE);

describe('Chat Service', () => {
  let mock;
  let db;

  before(async function() {
    this.timeout(10000); 
    mock = new MockAdapter(axios);

    // Configurer une base de données en mémoire pour les tests
    db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    await db.execute(`
      CREATE TABLE IF NOT EXISTS reponse (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_message TEXT NOT NULL,
        assistant_response TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });

  after(async () => {
    await db.execute('DROP TABLE IF EXISTS reponse');
    await db.end();
    mock.restore();
  });

  it('should fetch a chat response from OpenAI API', async function() {
    this.timeout(20000); 
    const messages = [
      { role: 'system', content: 'You are a football coach assistant.' },
      { role: 'user', content: 'Give me some football tactics' }
    ];

    mock.onPost('https://api.openai.com/v1/chat/completions').reply(200, {
      choices: [
        {
          message: {
            content: 'Sure! Here are some common football tactics that you can use: ...'
          }
        }
      ]
    });

    const response = await fetchChatResponse(messages, db);
    console.log('Received response:', response.advice);
    expect(response.advice).to.include('football'); 
  });
});
