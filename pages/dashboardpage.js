export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardTitle = page.getByText('Dashboard').first();
        this.branchInventoryHeading = page.getByText('Branch Inventory Overview').first();
        this.totalBranches = page.getByText('View Details').first();
        this.verifiedBranches = page.getByText('View Details').nth(1);
        this.mismatchBranches = page.getByText('View Details').nth(2);
        this.sortDropdown = page.locator('select, [role="combobox"]');
        this.searchbox = page.getByRole('textbox', { name: 'Search by Branch Code or Name' });
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

    async searchBranch(branchValue) {
        const resolvedBranchValue = typeof branchValue === 'object' && branchValue !== null
            ? (branchValue.branchValue || branchValue.branchName || '')
            : branchValue;

        if (!resolvedBranchValue || !String(resolvedBranchValue).trim()) {
            throw new Error('Branch name or ID is required');
        }

        const searchTerm = String(resolvedBranchValue).trim();
        await this.searchbox.waitFor({ state: 'visible', timeout: 30000 });
        await this.searchbox.click();
        await this.searchbox.fill(searchTerm);

        const matchingRow = this.page.getByRole('row').filter({ hasText: searchTerm }).first();
        const rowCount = await matchingRow.count();

        if (rowCount === 0) {
            throw new Error(`No branch row found for search term: ${searchTerm}`);
        }

        await matchingRow.waitFor({ state: 'visible', timeout: 5000 });
        await matchingRow.getByRole('button').click();
        await this.page.getByText('Dashboard').nth(1).click();
    }

}