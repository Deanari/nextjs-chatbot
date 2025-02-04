import { test, expect } from '@playwright/test';
import { login, createBot, deleteBot } from '../../utils/helpers';

let testBotId = "";

test.beforeEach(async ({ page, browserName }) => {
  if (browserName !== 'chromium') {
    test.skip();
  }
  await login(page);
  testBotId = await createBot(page);
});

test.afterEach(async ({ page }) => {
  await deleteBot(page, testBotId);
})
test('should be able to search for a bot', async ({ page }) => {
  test.slow();
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('textbox', { name: 'search...' })).toBeVisible();
  await page.getByRole('textbox', { name: 'search...' }).click();
  // const responsePromise = page.waitForResponse('http://localhost:3000/?name=birb**')
  await page.getByRole('textbox', { name: 'search...' }).fill('Birb');
  // await responsePromise;
  await expect(page.getByRole('link', { name: 'Chatbot Birb This is a test' })).toBeVisible();
});