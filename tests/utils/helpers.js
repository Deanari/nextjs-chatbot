export async function login(page) {
    await page.goto('http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F');

    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Playwright-test');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('testingA123$');

    await page.getByRole('button', { name: 'Continue' }).click();
}

export async function createBot(page) {
    await page.waitForURL('http://localhost:3000/');
    await page.goto('http://localhost:3000/chatbot/new');

    await page.getByRole('textbox', { name: 'Image' }).click();
    await page.getByRole('textbox', { name: 'Image' }).fill('https://i.pinimg.com/originals/10/a7/86/10a7865a78d7d8a749f84484bc5757e7.png');

    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Birb');

  
    await page.getByRole('textbox', { name: 'Description' }).fill('This is a test bot created by Playwright');

    const responsePromise = page.waitForResponse('http://localhost:3000/api/chatbot');
    await page.getByRole('button', { name: 'Create your chatbot' }).click();
  
    const response = await responsePromise;
    const jsonResponse = await response.json();
    await page.waitForURL('**/');

    return jsonResponse.id;
}

export async function deleteBot(page, botId) {
    await page.goto(`http://localhost:3000/chat/${botId}`);
    
    // await expect(page.locator('[id="radix-\\:rp\\:"]')).toBeVisible();
    await page.getByTestId('bot-options-menu').click();
    // await expect(page.getByRole('menuitem', { name: 'Delete' })).toBeVisible();
    await page.getByTestId('delete-bot').click();
    await page.waitForURL('**/');
}