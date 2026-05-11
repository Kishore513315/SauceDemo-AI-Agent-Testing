import { test, expect } from '../fixtures/fixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';

test.describe('Cart Badge', () => {
    // TC-01: Add first product and verify badge shows 1
    test('TC-01: Cart badge should show 1 after adding first product', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.addProductToCart(products.products[0].name);
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe('1');
    });

    // TC-02: Add second product and verify badge shows 2
    test('TC-02: Cart badge should show 2 after adding second product', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.addProductToCart(products.products[1].name);
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe('2');
    });

    // TC-03: Add third product and verify badge shows 3
    test('TC-03: Cart badge should show 3 after adding third product', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.addProductToCart(products.products[1].name);
        await inventoryPage.addProductToCart(products.products[2].name);
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe('3');
    });

    // TC-04: Remove product and verify badge count decreases
    test('TC-04: Cart badge should decrease when product is removed', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.addProductToCart(products.products[1].name);
        await inventoryPage.addProductToCart(products.products[2].name);
        await inventoryPage.addProductToCart(products.products[0].name);
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe('2');
    });
});