import { browser } from '@wdio/globals';
import { $ } from '@wdio/globals';
import { expect } from 'chai';
import Page from './page';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
class GooglePage extends Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open () {
        return browser.url(`https://www.google.com`);
    }

    public get googleSearchBar () {
        return $('textarea[name="q"]');
    }

    public get googleSubmitButton () {
        return $('input[aria-label="Google Search"]');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }

    public async search (searchQuery: string) {
        await this.googleSearchBar.setValue(searchQuery);
        await this.googleSubmitButton.click();
    }

    public async verifySearchTitle (searchQuery: string) { 
        await browser.waitUntil(
            async () => (await browser.getTitle()).toLowerCase().startsWith(searchQuery.toLowerCase()),
            {
                timeout:10000,
                timeoutMsg: "Expected title to contain the word " + searchQuery
            }
        );
        const title = await browser.getTitle();
        expect(title.toLowerCase()).to.include(searchQuery.toLowerCase());
    }
}

export default new GooglePage();

