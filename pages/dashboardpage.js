export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardTitle = page.getByText('Dashboard').first();
        this.branchInventoryHeading = page.getByText('Branch Inventory Overview').first();
        this.totalBranches = page.getByText('View Details').first();
        this.verifiedBranches = page.getByText('View Details').nth(1);
        this.mismatchBranches = page.getByText('View Details').nth(2);
        this.sortDropdown = page.locator('select, [role="combobox"]');
    }

    async waitForDashboardLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.dashboardTitle.waitFor({ state: 'visible', timeout: 30000 });
        await this.branchInventoryHeading.waitFor({ state: 'visible', timeout: 30000 });
    }

    async clickTotalBranches() {
        await this.totalBranches.click();
    }

    async clickVerifiedBranches() {
        await this.verifiedBranches.click();
    }

    async clickMismatchBranches() {
        await this.mismatchBranches.click();
    }

    async sortAscending() {
        await this.sortDropdown.selectOption('name-az');
    }

    async sortDescending() {
        await this.sortDropdown.selectOption('name-za');
    }

    async dashboardFilter() {
        await this.waitForDashboardLoaded();
        await this.clickTotalBranches();
        await this.clickVerifiedBranches();
        await this.clickMismatchBranches();
        await this.clickTotalBranches();
        await this.sortDescending();
        await this.sortAscending();
    }
}
