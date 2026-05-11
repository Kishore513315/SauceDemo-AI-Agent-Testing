import { test, expect } from '../fixtures/fixtures';
import users from '../test-data/users.json';
import products from '../test-data/products.json';

test.describe('Product Details', () => {
    // TC-01: Navigate to product details page and verify content
    test('TC-01: Product details page should display product information', async ({ loginPage, inventoryPage, page }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.clickProduct(products.products[0].name);
        await expect(page.locator('.inventory_details_name')).toHaveText(products.products[0].name);
        await expect(page.locator('.inventory_details_desc')).toBeVisible();
        await expect(page.locator('.inventory_details_price')).toHaveText(products.products[0].price);
        await expect(page.locator('.inventory_details_img')).toBeVisible();
    });

    // TC-02: Verify product details URL contains product ID
    test('TC-02: Product details page URL should contain product ID', async ({ loginPage, inventoryPage, page }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.clickProduct(products.products[0].name);
        await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
    });

    // TC-03: Verify back to products button is present
    test('TC-03: Back to products button should be visible on details page', async ({ loginPage, inventoryPage, page }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();

        await inventoryPage.clickProduct(products.products[0].name);
        await expect(page.locator('button[data-test="back-to-products"]')).toBeVisible();
    });
});