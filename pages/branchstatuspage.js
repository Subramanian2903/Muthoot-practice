export class BranchStatusPage {
    constructor(page) {
        this.page = page;
        this.branchStatusTitle = page.getByRole('heading', { name: /branch status/i }).or(page.getByText(/branch status/i));
        this.normalBranches = page.getByRole('button', { name: /normal branches/i });
        this.alertBranches = page.getByRole('button', { name: /alert branches/i });
        this.listViewButton = page.getByRole('button', { name: 'List View' });
        this.mapViewButton = page.getByRole('button', { name: 'Map View' });
        this.filterBy = page.getByLabel('Filter by');
        this.dashboardMenuButton = page.getByText('Dashboard');
    }

    async clickbranchStatusTitle() {
        await this.branchStatusTitle.click();
    }

    async waitForBranchStatusLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator('body').waitFor({ state: 'visible', timeout: 30000 });

        try {
            await this.branchStatusTitle.waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            await this.page.getByText(/branch status/i).first().waitFor({ state: 'visible', timeout: 10000 });
        }
    }

    async clickNormalBranches() {
        await this.normalBranches.first().click();
    }

    async clickAlertBranches() {
        await this.alertBranches.first().click();
    }

    async clickListView() {
        await this.listViewButton.click();
    }

    async clickMapView() {
        await this.mapViewButton.click();
    }

    async dashboardMenu() {
        await this.dashboardMenuButton.click();
    }

    async Open() {
        await this.filterBy.selectOption({ label: 'All' });
    }

    async Close() {
        await this.filterBy.selectOption({ label: 'Out of Schedule Open' });
    }

    async Out_of_Schedule_Open() {
        await this.filterBy.selectOption({ label: 'Out of Schedule Close' });
    }

    async Out_of_Schedule_Close() {
        await this.filterBy.selectOption({ label: 'All' });
    }

    async branchStatusFilter() {
        await this.clickbranchStatusTitle();
        await this.waitForBranchStatusLoaded();
        await this.clickListView();
        await this.Open();
        await this.Close();
        await this.Out_of_Schedule_Open();
        await this.Out_of_Schedule_Close();
        await this.clickNormalBranches();
        await this.clickListView();
        await this.clickMapView();
        await this.clickAlertBranches();
        await this.clickListView();
        await this.clickMapView();
        await this.dashboardMenu();
        await this.clickbranchStatusTitle();
        await this.clickListView();
        await this.page.getByRole('button', { name: 'View Technopark Trivandrum' }).click();
        await this.page.getByText('Branch Status').nth(1).click();
    }

}



