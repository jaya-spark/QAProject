const{test,expect}=require('@playwright/test');

test('Event hub test',async({page})=>
{

const card=page.getByTestId("event-card");
    //Sign in and open the Events page from Browse Events.
await page.goto("https://eventhub.rahulshettyacademy.com/login");

await page.getByPlaceholder('you@email.com').fill("jayaqa@gmail.com");
await page.locator("[type='password']").fill("Welcome@123");
await page.getByRole('button',{name:'Sign In'}).click();
await page.getByText("Explore All Events").waitFor();
await page.getByTestId("nav-events").click();

const upcomingEventHeading =page.getByText("Upcoming Events");

//Confirm the Upcoming Events heading is visible.
await card.nth(0).waitFor();
await expect(upcomingEventHeading).toBeVisible();

// Use several locator strategies on the filter area: search for World, choose category Conference, and choose city Hyderabad.
await page.getByPlaceholder('Search events, venues…').fill("world");
await page.locator('select').nth(0).selectOption('Conference');
await page.locator('select').nth(1).selectOption('Hyderabad');

//Work with the visible event cards: confirm at least one card matches, narrow to the card that shows World Tech Summit, and confirm exactly one match.
// await page.getByTestId('event-card').filter({hasText:'World'});
// const worldCard=page.getByTestId('event-card').getByText("World Tech Summit");
// const cardTitle=await worldCard.textContent();
// const cardPrice=await worldCard.locator('xpath=/../..//p').textContent();
// const seatsText= await worldCard.locator('xpath=/../..//span').nth(2).textContent();
// const seatCount=seatsText.split(' ')[0];


await page.pause();

const worldCard = page
  .getByTestId('event-card')
  .filter({ has: page.getByRole('heading', { name: 'World Tech Summit' }) })
  const cardTitle= await worldCard.getByRole('heading').textContent();
  const cardPrice=await worldCard.locator('p').textContent();
   const seatsText= await worldCard.locator('p').locator('xpath=/..//span').textContent();
   const seatCount=seatsText.split(' ')[0];

// From that matching card, capture the event title, price text, and seats text.
  console.log("-----card-title -----"+cardTitle);
 console.log("-----price -----"+ cardPrice);
console.log("-----seat-left count -----"+ seatCount);

//Confirm the title is World Tech Summit, the price text contains $, and the available seat count parsed from the seats text is greater than 0.
expect(cardTitle).toEqual("World Tech Summit");
expect(cardPrice).toContain("$");
expect(parseInt(seatCount)).toBeGreaterThan(0);

//From inside that same card only, open Book Now.

await worldCard.getByRole('link', { name: 'Book Now' }).click();

//Confirm the detail page URL contains /events/, the main heading matches the stored title, and the price section matches the stored price text

// await card.getByTestId('book-now-btn').click();
await expect(page).toHaveURL(/events/);

await expect(page.locator('main').getByRole('heading',{name:cardTitle})).toBeVisible();
await expect(page.locator('div div span').getByText(cardPrice).first()).toBeVisible();



//Return to the Events list, clear filters back to all categories and cities, and confirm at least three cards are visible.
await page.goBack();

await page.getByRole('button',{name:"Clear filters"}).click();


const cards=page.getByTestId('event-card');

await expect.poll(async () => await cards.count()).toBeGreaterThan(2);
const cardcount=await page.getByTestId('event-card').count();

    


//Compare the first, second, and last card titles: all must be non-empty, and the first and last titles must differ.


for(let i=0;i<cardcount;i++)
{
expect(await cards.nth(i).locator('h3').textContent()).not.toBe('');

}

const firstCardTitle=await cards.first().locator('h3').textContent();
const lastCardTitle=await cards.last().locator('h3').textContent();

expect(firstCardTitle).not.toEqual(lastCardTitle);

}
)


