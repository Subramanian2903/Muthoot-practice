import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginpage.js';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    credentials: async ({}, use) => {
        await use({ username: 'admin@mtht.com', password: 'Pass@123' });
    },

    invalidCredentials: async ({}, use) => {
        await use({ username: 'admin@mht.com', password: 'Pass@13' });
    },

    branchDetails: async ({}, use) => {
        await use({
            branchValue: 'BR001',
            branchName: 'Technopark Trivandrum'
        });
    }

});

export { expect } from '@playwright/test';
