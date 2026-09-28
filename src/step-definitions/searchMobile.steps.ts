import assert from 'node:assert/strict';
import { Given, Then, When } from '@cucumber/cucumber';
import { SearchMobilePage } from '../pages/searchMobile.page';
import { CustomWorld } from '../support/custom-world';

Given('the user opens the browser', async function (this: CustomWorld) {
	assert.ok(this.page, 'The browser page should be initialized by the Before hook');
});

Given('navigates to the Flipkart homepage', async function (this: CustomWorld) {
	assert.ok(this.page, 'The browser page should be initialized by the Before hook');
	await new SearchMobilePage(this.page).open();
});

Given('closes any login popup if displayed', async function (this: CustomWorld) {
	assert.ok(this.page, 'The browser page should be initialized by the Before hook');
	await new SearchMobilePage(this.page).closeLoginPopupIfVisible();
});

When(
	'the user enters {string} into the search bar',
	async function (this: CustomWorld, searchKeyword: string) {
		assert.ok(this.page, 'The browser page should be initialized by the Before hook');
		await new SearchMobilePage(this.page).searchProduct(searchKeyword);
	}
);

When('clicks on the search button', async function (this: CustomWorld) {
	assert.ok(this.page, 'The browser page should be initialized by the Before hook');
	await new SearchMobilePage(this.page).clickSearchButton();
});

Then(
	'the page title should contain {string}',
	async function (this: CustomWorld, expectedTitle: string) {
		assert.ok(this.page, 'The browser page should be initialized by the Before hook');
		await this.page.waitForLoadState('domcontentloaded');
		assert.ok(
			(await this.page.title()).toLowerCase().includes(expectedTitle.toLowerCase()),
			`Expected page title to contain "${expectedTitle}", received "${await this.page.title()}"`
		);
	}
);

Then(
	'the search results header should display {string}',
	async function (this: CustomWorld, searchKeyword: string) {
		assert.ok(this.page, 'The browser page should be initialized by the Before hook');
		await this.page.getByText(searchKeyword, { exact: false }).first().waitFor();
	}
);
