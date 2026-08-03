import { test, expect } from '../utils/basetest.js';
import { BranchStatusPage } from '../pages/branchstatuspage.js';

test('Verify Branch Page', async ({ loginPage, credentials}) => {
    const loginSuccess = await loginPage.login(credentials.username, credentials.password);
    expect(loginSuccess).toBe(true);

    const branchStatusPage = new BranchStatusPage(loginPage.page);
    await expect(loginPage.page).toHaveURL(/dashboard/);
    await branchStatusPage.branchStatusFilter();
    await loginPage.logout();
});