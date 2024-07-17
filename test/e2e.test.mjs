import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('End-to-End Tests', () => {
  let browser, page;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3001'); // Assurez-vous que le serveur frontend est en cours d'exécution
  });

  after(async () => {
    await browser.close();
  });

  it('should send a message and receive a response', async () => {
    await page.type('textarea', 'Give me some football tactics');
    await page.click('button');

    // Attendre que la réponse soit affichée
    await page.waitForSelector('p', { timeout: 5000 });

    const responseText = await page.$eval('p', el => el.textContent);
    expect(responseText).to.include('Assistant:'); // Vérifiez que la réponse inclut le rôle de l'assistant
  });
});
