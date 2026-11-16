const{test,expect} = require('@playwright/test');


test('eventhub login opage test',async({page})=>{

await page.goto('https://eventhub.rahulshettyacademy.com/login');
await expect(page.locator('#password')).toBeVisible();
await expect(page).toHaveURL(/login/);
await expect(page.getByText('Sign in to EventHub')).toBeVisible();
