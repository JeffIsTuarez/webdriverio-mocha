import { expect } from 'chai';
import { browser } from '@wdio/globals';

// without using a seperate instance and uses the global property
describe('Searching for apples', () => {
    it('Should Search for apples', async() => {
        browser.url('https://www.google.com');
        let searchBox =  $('textarea[name="q"]');
        searchBox.setValue('Apples.');
        let enterKey =  $("input[aria-label='Google Search']")
        await enterKey.click();
        await browser.waitUntil(
            async () => (await browser.getTitle()).toLowerCase().startsWith("apple"),
            {
                timeout:10000,
                timeoutMsg: "Expected title to contain the word Apple"
            }
        );
        const title = await browser.getTitle();
        expect(title.toLowerCase()).to.include('apple');
    });
});

