import GooglePage from '../pageobjects/google.page';

// PageObject Version
describe('Searching for toast', () => {
    it('Should Search for toast', async() => {
        await GooglePage.open();
        await GooglePage.search('Toast?');
        await GooglePage.verifySearchTitle("Toast");
    });
});

