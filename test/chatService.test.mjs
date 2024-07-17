import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchChatResponse } from '../backend/src/services/chatService.js';

describe('Chat Service', () => {
  let mock;

  before(() => {
    mock = new MockAdapter(axios);
  });

  after(() => {
    mock.restore();
  });

  it('should fetch a chat response from OpenAI API', async () => {
    const messages = [
      { role: 'system', content: 'You are a football coach assistant.' },
      { role: 'user', content: 'Give me some football tactics' }
    ];

    mock.onPost('https://api.openai.com/v1/chat/completions').reply(200, {
      choices: [
        {
          message: {
            content: 'Sure! Here are some football tactics...'
          }
        }
      ]
    });

    const response = await fetchChatResponse(messages);
    expect(response).to.equal('Sure! Here are some football tactics...');
  });
});
