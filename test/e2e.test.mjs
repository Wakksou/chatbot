import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('End-to-End Tests', () => {
  let browser, page;

  before(async function() {
    this.timeout(20000); // Ajout d'un timeout 
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('http://localhost:3001'); // Assurez-vous que le serveur frontend est en cours d'exécution
  });

  after(async () => {
    await browser.close();
  });

  it('should send a message and receive a response', async function() {
    this.timeout(20000); // Ajout d'un timeout 

    await page.type('textarea', 'Give me some football tactics');
    await page.click('button');

    // Attendre que la réponse soit affichée
    await page.waitForSelector('p', { timeout: 20000 });

    const responseText = await page.$$eval('p', elements => elements.map(el => el.textContent));
    const assistantResponse = responseText.find(text => text.includes('Assistant:'));

    expect(assistantResponse).to.exist; // Vérifiez que la réponse de l'assistant est présente
  });
});
