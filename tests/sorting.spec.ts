import { test, expect } from '../fixtures/fixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';

test.describe('Product Sorting', () => {
    // TC-01: Sort products by Name (A to Z)
    test('TC-01: Products should be sorted by Name (A to Z)', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.sortBy('az');
        const productNames = await inventoryPage.getProductNames();
        const sortedAZ = [...products.products.map(p => p.name)].sort();
        expect(productNames).toEqual(sortedAZ);
    });

    // TC-02: Sort products by Name (Z to A)
    test('TC-02: Products should be sorted by Name (Z to A)', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.sortBy('za');
        const productNames = await inventoryPage.getProductNames();
        const sortedZA = [...products.products.map(p => p.name)].sort().reverse();
        expect(productNames).toEqual(sortedZA);
    });

    // TC-03: Sort products by Price (low to high)
    test('TC-03: Products should be sorted by Price (low to high)', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.sortBy('lohi');
        const productNames = await inventoryPage.getProductNames();
        const sortedLowHigh = [...products.products].sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))).map(p => p.name);
        expect(productNames).toEqual(sortedLowHigh);
    });

    // TC-04: Sort products by Price (high to low)
    test('TC-04: Products should be sorted by Price (high to low)', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.sortBy('hilo');
        const productNames = await inventoryPage.getProductNames();
        const sortedHighLow = [...products.products].sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))).map(p => p.name);
        expect(productNames).toEqual(sortedHighLow);
    });
});