import { Page, expect } from '@playwright/test';

export class InventoryPage {

    private page: Page;

    private productItem = '.inventory_item';
    private cartIcon = '.shopping_cart_link';
    private cartBadge = '.shopping_cart_badge';
    private sortDropdown = '.product_sort_container';

    constructor(page: Page) {
        this.page = page;
    }

    async isPageLoaded() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async addProductToCart(productName: string) {
        await this.page.getByText(productName).locator('xpath=ancestor::div[@class="inventory_item"]')
            .getByRole('button').click();
    }

    async goToCart() {
        await this.page.click(this.cartIcon);
    }

    async getCartItemCount() {
        return await this.page.textContent(this.cartBadge);
    }

    async isCartBadgeVisible() {
        return await this.page.locator(this.cartBadge).isVisible();
    }

    async sortBy(option: string) {
        await this.page.selectOption(this.sortDropdown, option);
    }

    async getProductNames() {
        return await this.page.locator('.inventory_item_name').allTextContents();
    }

    async clickProduct(productName: string) {
        await this.page.getByText(productName).click();
    }
}