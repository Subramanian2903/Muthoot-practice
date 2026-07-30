import { test, expect } from '../utils/basetest.js';
import { DashboardPage } from '../pages/dashboardpage.js';

test('Verify Dashboard Filters', async ({ loginPage, credentials }) => {
    const loginSuccess = await loginPage.login(credentials.username, credentials.password);
    expect(loginSuccess).toBe(true);

    const dashboardPage = new DashboardPage(loginPage.page);
    await expect(loginPage.page).toHaveURL(/dashboard/);
    await dashboardPage.dashboardFilter();
    await loginPage.logout();
});