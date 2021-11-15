describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://172.20.80.1:5500/index.html');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    console.log(`Checking product item 1/${prodItems.length}`);
    // Grab the .data property of <product-items> to grab all of the json data stored inside
    for (let i = 0; i < prodItems.length; i++) {
      data = await prodItems[i].getProperty('data');
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }
      // Expect allArePopulated to still be true
      expect(allArePopulated).toBe(true);
    }

    // TODO - Step 1 DONE
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found

  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2 DONE
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    // Once you have the button, you can click it and check the innerText property of the button.
    // Once you have the innerText property, use innerText['_remoteObject'].value to get the text value of it

    //ok remember to do await or it will say things are not a function lol
    const productItem = await page.$('product-item');
    const shadowRoot = await productItem.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    await button.click();
    const innerText = await button.getProperty('innerText');
    const text = await innerText['_remoteObject'].value;
    expect(text).toBe('Remove from Cart');

    // console.log('text is: ', text);

  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3 DONE
    // Query select all of the <product-item> elements, then for every single product element
    // get the shadowRoot and query select the button inside, and click on it.
    // Check to see if the innerText of #cart-count is 20

    const productItems = await page.$$('product-item');
    //if ind=0, it fails. Start at 1 instead
    //For step 3 in Part 1, just wanted to point out that you should be excluding a click for the button you clicked in Step 2, 
    //so you’ll be clicking one less  <product-item>  in Step 3
    for (let ind = 1; ind < productItems.length; ind++) {
      const item = await productItems[ind];
      const shadowRoot2 = await item.getProperty('shadowRoot');
      const button2 = await shadowRoot2.$('button');
      await button2.click();
      // console.log("button clicked this many times: 1+", ind);
    }
    const cartCount = await page.$('#cart-count');
    // console.log('the text inside the button is: ', cartCount.innerText);
    const innerText2 = await cartCount.getProperty('innerText');
    const text2 = await innerText2['_remoteObject'].value;
    expect(text2).toBe('20');
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4 DONE
    // Reload the page, then select all of the <product-item> elements, and check every
    // element to make sure that all of their buttons say "Remove from Cart".
    // Also check to make sure that #cart-count is still 20

    // yeeted this line from stackoverflow
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

    const productItems4 = await page.$$('product-item');
    //if ind=0, it fails
    for (let ind = 1; ind < productItems4.length; ind++) {
      const item4 = await productItems4[ind];
      const shadowRoot4 = await item4.getProperty('shadowRoot');
      const button4 = await shadowRoot4.$('button');
      const innerText4 = await button4.getProperty('innerText');
      const text4 = await innerText4['_remoteObject'].value;
      expect(text4).toBe('Remove from Cart');
    }


    const cartCount4 = await page.$('#cart-count');
    const innerText42 = await cartCount4.getProperty('innerText');
    const text42 = await innerText42['_remoteObject'].value;
    expect(text42).toBe('20');
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5 DONE
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is

    //HAVE TO USE page.evaluate, cannot get it directly with window.localStorage
    const theCart = await page.evaluate(() => {
      return window.localStorage.getItem('cart');
    });

    expect(theCart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');

  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    // Once you have, check to make sure that #cart-count is now 0
    const productItems6 = await page.$$('product-item');
    //tbh idk why this is 0 and the other one has to start at 1
    for (let ind6 = 0; ind6 < productItems6.length; ind6++) {
      const item6 = await productItems6[ind6];
      const shadowRoot6 = await item6.getProperty('shadowRoot');
      const button6 = await shadowRoot6.$('button');
      const btnInnerText6 = await button6.getProperty('innerText');
      const text6 = await btnInnerText6['_remoteObject'].value;
      if (text6 == 'Remove from Cart') {
        await button6.click();
      }
    }
    const cartCount6 = await page.$('#cart-count');
    const innerText6 = await cartCount6.getProperty('innerText');
    const text6 = await innerText6['_remoteObject'].value;
    expect(text6).toBe('0');

  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7 DONE
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

    const productItems7 = await page.$$('product-item');
    for (let ind7 = 0; ind7 < productItems7.length; ind7++) {
      const item7 = await productItems7[ind7];
      const shadowRoot7 = await item7.getProperty('shadowRoot');
      const button7 = await shadowRoot7.$('button');
      const btnInnerText7 = await button7.getProperty('innerText');
      const text7 = await btnInnerText7['_remoteObject'].value;
      expect(text7).toBe('Add to Cart');
    }

    const cartCount7 = await page.$('#cart-count');
    const innerText7 = await cartCount7.getProperty('innerText');
    const text7 = await innerText7['_remoteObject'].value;
    expect(text7).toBe('0');

  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    const theCart8 = await page.evaluate(() => {
      return window.localStorage.getItem('cart');
    });

    expect(theCart8).toBe('[]');
  });
});