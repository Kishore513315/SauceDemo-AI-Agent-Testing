import { test, expect } from '../fixtures/fixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';

test.describe('Cart Badge Edge Cases', () => {
    // TC-01: Cart badge should not be visible when cart is empty
    test('TC-01: Cart badge should not be visible when cart is empty', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        const isBadgeVisible = await inventoryPage.isCartBadgeVisible();
        expect(isBadgeVisible).toBe(false);
    });

    // TC-02: Cart badge should appear after adding product
    test('TC-02: Cart badge should appear after adding product to empty cart', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.addProductToCart(products.products[0].name);
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe('1');
    });

    // TC-03: Cart badge should disappear after removing last product
    test('TC-03: Cart badge should disappear after removing last product', async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.addProductToCart(products.products[0].name);
        const isBadgeVisible = await inventoryPage.isCartBadgeVisible();
        expect(isBadgeVisible).toBe(false);
    });
});