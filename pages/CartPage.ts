import { Page, expect } from '@playwright/test';

export class CartPage {

    private page: Page;

    private cartItem = '.cart_item';
    private checkoutButton = '#checkout';
    private continueShoppingButton = '#continue-shopping';
    private inventoryItemName = '.inventory_item_name';
    private inventoryItemPrice = '.inventory_item_price';
    private removeButton = '[data-test^="remove"]';

    constructor(page: Page) {
        this.page = page;
    }

    async isPageLoaded() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }

    async getCartItems() {
        return await this.page.locator(this.cartItem).count();
    }

    async getItemNames() {
        return await this.page.textContent(this.inventoryItemName);
    }

    async getItemPrices() {
        return await this.page.textContent(this.inventoryItemPrice);
    }

    async removeItem(productName: string) {
        await this.page.getByText(productName).locator('xpath=ancestor::div[@class="cart_item"]')
            .getByRole('button').click();
    }

    async checkout() {
        await this.page.click(this.checkoutButton);
    }

    async continueShopping() {
        await this.page.click(this.continueShoppingButton);
    }
}