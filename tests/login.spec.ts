import { test, expect } from '../fixtures/fixtures';
import users from '../test-data/users.json';

test.describe('Login Tests', () => {

    // TC-01: Valid login
    test('TC-01: Valid username and password should login successfully', 
    async ({ loginPage, inventoryPage }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.isPageLoaded();
    });

    // TC-02: Valid username wrong password
    test('TC-02: Valid username with wrong password should show error', 
    async ({ loginPage }) => {
        await loginPage.login(users.standard.username, users.invalid.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface');
    });

    // TC-03: Wrong username valid password
    test('TC-03: Wrong username with valid password should show error', 
    async ({ loginPage }) => {
        await loginPage.login(users.invalid.username, users.standard.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface');
    });

    // TC-04: Wrong username wrong password
    test('TC-04: Wrong username and wrong password should show error', 
    async ({ loginPage }) => {
        await loginPage.login(users.invalid.username, users.invalid.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface');
    });

    // TC-05: Empty credentials
    test('TC-05: Empty username and password should show error', 
    async ({ loginPage }) => {
        await loginPage.login('', '');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username is required');
    });

    // TC-06: Locked out user
    test('TC-06: Locked out user should see locked out error', 
    async ({ loginPage }) => {
        await loginPage.login(users.locked.username, users.locked.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('locked out');
    });

});