import { test, expect } from '../fixtures/fixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';

test.describe('Cart Tests', () => {

    // TC-01: Add multiple items to cart
    test('TC-01: User should be able to add multiple items to cart',
    async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.addProductToCart(products.products[1].name);
    });

    // TC-02: Cart badge shows correct count
    test('TC-02: Cart badge should show correct number of items',
    async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.addProductToCart(products.products[1].name);
        const count = await inventoryPage.getCartItemCount();
        expect(count).toBe('2');
    });

    // TC-03: Navigate to cart and verify items
    test('TC-03: User should see added items when navigating to cart',
    async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.addProductToCart(products.products[1].name);
        await inventoryPage.goToCart();
        await cartPage.isPageLoaded();
    });

    // TC-04: Verify correct item names in cart
    test('TC-04: Cart should show correct item names',
    async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.goToCart();
        await cartPage.isPageLoaded();
        const itemName = await cartPage.getItemNames();
        expect(itemName).toContain(products.products[0].name);
    });

    // TC-05: Verify correct item prices in cart
    test('TC-05: Cart should show correct item prices',
    async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.goToCart();
        await cartPage.isPageLoaded();
        const itemPrice = await cartPage.getItemPrices();
        expect(itemPrice).toContain(products.products[0].price);
    });

    // TC-06: Remove item from cart
    test('TC-06: User should be able to remove item from cart',
    async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.goToCart();
        await cartPage.isPageLoaded();
        await cartPage.removeItem(products.products[0].name);
        const itemCount = await cartPage.getCartItems();
        expect(itemCount).toBe(0);
    });

    // TC-07: Continue shopping returns to inventory
    test('TC-07: Continue shopping button should return to inventory page',
    async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.goToCart();
        await cartPage.isPageLoaded();
        await cartPage.continueShopping();
        await inventoryPage.isPageLoaded();
    });

    // TC-08: Proceed to checkout from cart
    test('TC-08: User should be able to proceed to checkout from cart',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.goToCart();
        await cartPage.isPageLoaded();
        await cartPage.checkout();
        await checkoutPage.isPageLoaded();
    });

});