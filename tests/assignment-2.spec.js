import {test,expect} from '@playwright/test';


test('smoke test:login',async({page})=>{
//Write a smoke test that opens /login using the configured base URL (not a hard-coded full URL for that navigation).
await page.goto('/login');


//Assert the page title matches EventHub, the email field is visible, and the Sign In button is visible.
await expect(page).toHaveTitle(/EventHub/i);
await expect(page.getByPlaceholder('you@email.com')).toBeVisible();
await expect(page.getByRole('button',{name :'Sign In'})).toBeVisible();

});

//In another check, use the built-in page fixture to open the login page, fill the email field with beginner@sample.com, and confirm the same field still shows that value.


test('login with page fixture',async({page,browser})=>{
const emailField=page.getByPlaceholder('you@email.com');
await page.goto('/login');
await emailField.fill('beginner@sample.com');
await expect(emailField).toHaveValue('beginner@sample.com');
await page.pause();

//In the same flow, create a fresh isolated browser context and page, open the login page with the full application URL, and confirm the Sign in to EventHub heading is visible while the email field starts empty.

const context=await browser.newContext();
const newPage= await context.newPage();

newPage.goto('/login');
await expect(newPage.getByRole('heading',{name:'Sign in to EventHub'})).toBeVisible();
await expect(newPage.getByPlaceholder('you@email.com')).toHaveValue('');

//Close the isolated context when finished.
context.close();






})