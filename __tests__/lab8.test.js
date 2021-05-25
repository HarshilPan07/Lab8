describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    expect(page.url()).toMatch('/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const header_el = await page.$('h1');
    const header_title = await (await header_el.getProperty('textContent')).jsonValue();
    console.log(`header should be Entry 1. header=${header_title}`);
    expect(header_title).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    let expected_contents = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };

    expect(page).toMatch(expected_contents);
    // let entry_page = await page.$('body > entry-page');
    // console.log(`entry-page=${entry_page}`);
    // let data = await entry_page.getProperty('post');
    // console.log(`data=${data}`);
    // let plainValue = await data.jsonValue();
    // console.log(`plainValue=${plainValue}`);
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
  
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let body_el = await page.$('body');
    const class_name = await (await body_el.getProperty('className')).jsonValue();
    expect(class_name).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img');
    expect(page.url()).toMatch('/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header_el = await page.$('h1');
    const header_title = await (await header_el.getProperty('textContent')).jsonValue();
    console.log(`header=${header_title}`);
    expect(header_title).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const body_el = await page.$('body');
    const class_name = await (await body_el.getProperty('className')).jsonValue();
    console.log(`class_name=${class_name}`);
    expect(class_name).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const url = await page.url();
    expect(url).toMatch('/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should be starting url', async() => {
    await page.goBack();
    const url = await page.url();
    expect(url).toMatch('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
    const header_el = await page.$('h1');
    const header_title = await (await header_el.getProperty('textContent')).jsonValue();
    console.log(`header=${header_title}`);
    expect(header_title).toMatch('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute ', async() => {
    const body_el = await page.$('body');
    const class_name = await (await body_el.getProperty('className')).jsonValue();
    console.log(`class_name=${class_name}`);
    expect(class_name).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    const entries = await page.$$('journal-entry');
    await entries[1].click();
    page.waitForTimeout(300);
    const url = await page.url();
    console.log(`url should be entry2: ${url}`);
    expect(url).toMatch('/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    const header_el = await page.$('h1');
    const header_title = await (await header_el.getProperty('textContent')).jsonValue();
    console.log(`header should be Entry 2. header=${header_title}`);
    expect(header_title).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    const post_title_el = await page.$('h2');
    const post_title = await (await post_title_el.getProperty('textContent')).jsonValue();
    console.log(`post_title=${post_title}`);
    expect(post_title).toBe('Run, Forrest! Run!');
  });

  // create your own test 17
  it('Test17: ', async() => {
    
  });

  // create your own test 18
  it('Test18: ', async() => {
    
  });

  // create your own test 19
  it('Test19: ', async() => {
    
  });

  // create your own test 20
  it('Test20: ', async() => {
    
  });
});
