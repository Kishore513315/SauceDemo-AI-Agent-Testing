import { test, expect } from '../fixtures/fixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';

test.describe('Checkout Tests', () => {

    // Helper: Login, add item and go to checkout
    async function navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage }: any) {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
        await inventoryPage.addProductToCart(products.products[0].name);
        await inventoryPage.goToCart();
        await cartPage.isPageLoaded();
        await cartPage.checkout();
        await checkoutPage.isPageLoaded();
    }

    // TC-01: Fill valid details and continue
    test('TC-01: User should be able to fill checkout form and continue',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        await expect(checkoutPage['page']).toHaveURL(
            'https://www.saucedemo.com/checkout-step-two.html'
        );
    });

    // TC-02: Verify checkout overview page loads
    test('TC-02: Checkout overview page should load correctly',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        await expect(checkoutPage['page']).toHaveURL(
            'https://www.saucedemo.com/checkout-step-two.html'
        );
    });

    // TC-03: Verify payment info visible
    test('TC-03: Payment information should be visible on overview page',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        const paymentInfo = await checkoutPage['page'].locator('.summary_info').textContent();
        expect(paymentInfo).toContain('SauceCard');
    });

    // TC-04: Verify shipping info visible
    test('TC-04: Shipping information should be visible on overview page',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        const shippingInfo = await checkoutPage['page'].locator('.summary_info').textContent();
        expect(shippingInfo).toContain('Free Pony Express Delivery');
    });

    // TC-05: Verify total price with tax
    test('TC-05: Total price should include tax',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        const total = await checkoutPage.getTotalAmount();
        expect(total).toContain('Total:');
    });

    // TC-06: Cancel button returns to inventory
    test('TC-06: Cancel button should return user to inventory page',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage['page'].click('#cancel');
        await cartPage.isPageLoaded();
    });

    // TC-07: Finish button completes order
    test('TC-07: User should be able to finish the order',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        await checkoutPage.finish();
        await expect(checkoutPage['page']).toHaveURL(
            'https://www.saucedemo.com/checkout-complete.html'
        );
    });

    // TC-08: Confirmation message displayed
    test('TC-08: Order confirmation message should be displayed',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        await checkoutPage.finish();
        const message = await checkoutPage.getConfirmationMessage();
        expect(message).toContain('Thank you for your order');
    });

    // TC-09: Back home button returns to inventory
    test('TC-09: Back home button should return to inventory page',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        await checkoutPage.finish();
        await checkoutPage['page'].click('#back-to-products');
        await inventoryPage.isPageLoaded();
    });

    // TC-10: Empty first name shows error
    test('TC-10: Empty first name should show error message',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation('', 
            products.checkout.lastName, 
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('First Name is required');
    });

    // TC-11: Empty last name shows error
    test('TC-11: Empty last name should show error message',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName, 
            '', 
            products.checkout.postalCode
        );
        await checkoutPage.continue();
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Last Name is required');
    });

    // TC-12: Empty postal code shows error
    test('TC-12: Empty postal code should show error message',
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await navigateToCheckout({ loginPage, inventoryPage, cartPage, checkoutPage });
        await checkoutPage.fillCheckoutInformation(
            products.checkout.firstName,
            products.checkout.lastName,
            ''
        );
        await checkoutPage.continue();
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Postal Code is required');
    });

});