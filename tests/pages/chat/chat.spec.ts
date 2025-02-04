import { test, expect } from '@playwright/test';
import { login, createBot, deleteBot } from '../../utils/helpers';

let testBotId = "";

test.beforeEach(async ({ page, browserName }) => {
  if (browserName !== 'chromium') {
    test.skip();
  }
  await login(page);
  testBotId = await createBot(page)
});

test.afterEach(async ({page}) => {
  await deleteBot(page, testBotId);
})

test('should be able to send messages', async ({ page }) => {
  test.slow();
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Chatbot Birb This is a test' }).click();
  await page.waitForURL('**/chat/**');
  await expect(page.getByText('Birb', { exact: true })).toBeVisible();
  await expect(page.getByText('Hello, I am Birb')).toBeVisible();

  const initialCount = await page.getByRole('paragraph').count();
  await expect(page.getByRole('textbox', { name: 'Type a message' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Type a message' }).click();
  await page.getByRole('textbox', { name: 'Type a message' }).fill('Where is Buenos Aires located?');
  await expect(page.locator('form').getByRole('button')).toBeVisible();
  const responsePromise = page.waitForResponse('**/api/chat/**')
  await page.locator('form').getByRole('button').click();

  await responsePromise;
  const newCount = await page.getByRole('paragraph')
  await expect(newCount).toHaveCount(initialCount + 2);
});
