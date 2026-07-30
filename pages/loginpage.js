import { saveFailureScreenshot } from '../utils/screenshotHelper.js';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://d2poppos1d5g2h.cloudfront.net/';

        this.usernameInput = page.getByPlaceholder('Enter your user name');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.dashboardTitle = page.getByText('Dashboard').first();
        this.loginHeading = page.getByText('Sign in to continue to your account');
        this.profileIcon = page.locator('.avatar, .avatar-icon, [class*="avatar"]').first();
        this.logoutButton = page.getByText('Log Out').first();
    }

    async open() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
        await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.passwordInput.waitFor({ state: 'visible', timeout: 30000 });
    }

    // Reuseable screenshot handling is provided by `utils/screenshotHelper.js`

    async login(username, password) {
        await this.open();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        const dialogPromise = this.page.waitForEvent('dialog', { timeout: 8000 }).catch(() => null);
        await this.loginButton.click();

        const dialog = await dialogPromise;
        if (dialog) {
            await dialog.dismiss().catch(() => {});
            await saveFailureScreenshot(this.page, 'LoginFailure');
            return false;
        }

        const loggedIn = await this.dashboardTitle.isVisible({ timeout: 8000 }).catch(() => false);
        if (loggedIn) return true;

        await saveFailureScreenshot(this.page, 'LoginFailure');
        return false;
    }

    async logout() {
        await this.profileIcon.waitFor({ state: 'visible', timeout: 30000 });
        await this.profileIcon.click();
        await this.logoutButton.waitFor({ state: 'visible', timeout: 30000 });
        await this.logoutButton.click();
        await this.loginHeading.waitFor({ state: 'visible', timeout: 30000 });
    }
}
