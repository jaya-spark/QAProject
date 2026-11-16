const{test,expect} = require('@playwright/test');


test('eventhub login opage test',async({page})=>{

await page.goto('https://eventhub.rahulshettyacademy.com/login');
await expect(page.getByText('Sign in to EventHub')).toBeVisible();
await expect(page.getByPlaceholder('you@email.com')).toBeVisible();
await expect(page.getByRole('button',{name:'Sign In'})).toBeVisible();
await page.pause();

});