import { remote } from 'webdriverio';
import { expect } from 'chai';

// This is one way to utilize a new instance of webdriverio
// kinda messy but pretty educational and agnostic of wdio.conf 
describe('Google Search', () => {
  let browser: WebdriverIO.Browser;

  before(async () => {
    browser = await remote({
      capabilities: { browserName: 'chrome', browserVersion: '121.0.6167.85' }
    });
  });

  after(async () => {
    await browser.deleteSession();
  });

  it('should search for Cheese!', async () => {
    await browser.url('https://www.google.com');
    let searchBox = await browser.$('textarea[name="q"]');
    await searchBox.setValue('Cheese!');
    let enterKey = await browser.$("input[aria-label='Google Search']")
    await enterKey.click();
    await browser.waitUntil(
      async () => (await browser.getTitle()).toLowerCase().startsWith('cheese'),
      {
        timeout: 10000,
        timeoutMsg: 'Expected title to start with "cheese"'
      }
    );
    const title = await browser.getTitle();
    expect(title.toLowerCase()).to.include('cheese');
  });
});
