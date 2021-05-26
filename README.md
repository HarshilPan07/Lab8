# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

```(1) Within a Github action that runs whenever code is pushed.```

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

```No, because the message feature may involve many components working together like sending message from first person to server, saving message to server, and sending message from server to second person. Doing tests of the smaller components that make up the message feature would be a better idea.```

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

```Yes, this is a good place to use a unit test because checking the max message length is a small/encapsulated feature in the program.```

1. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

```I would expect it to run tests without a browser UI, so we wouldn't be able to actually observe what was happening.```

2. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

```
describe('Basic user flow for SPA ', () => {
    beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.click('settings);
    await page.waitForTimeout(500);
});
```