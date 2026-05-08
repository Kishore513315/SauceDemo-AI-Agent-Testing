import { Page, expect } from '@playwright/test';

export class CheckoutPage {

    private page: Page;

    private firstNameField = '#first-name';
    private lastNameField = '#last-name';
    private postalCodeField = '#postal-code';
    private continueButton = '#continue';
    private finishButton = '#finish';
    private cancelButton = '#cancel';
    private errorMessage = '[data-test="error"]';
    private summaryTotal = '.summary_total_label';
    private confirmationMessage = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

    async isPageLoaded() {
        await this.page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(this.firstNameField, firstName);
        await this.page.fill(this.lastNameField, lastName);
        await this.page.fill(this.postalCodeField, postalCode);
    }

    async continue() {
        await this.page.click(this.continueButton);
    }

    async cancel() {
        await this.page.click(this.cancelButton);
    }

    async finish() {
        await this.page.click(this.finishButton);
    }

    async getTotalAmount() {
        return await this.page.textContent(this.summaryTotal);
    }

    async getConfirmationMessage() {
        return await this.page.textContent(this.confirmationMessage);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage);
    }

}