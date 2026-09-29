import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
export class SearchMobilePage extends BasePage {
    private readonly searchProductInput: Locator;
    private readonly searchButton: Locator;
    private readonly closeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.searchProductInput = page.getByRole('textbox', { name: 'Search for products' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.closeButton = page.getByRole('button', { name: '✕' });

    }
  async open(url: string = process.env.QA_FLIPKART_URL || ''): Promise<void> {
  if (!url) {
    throw new Error('QA_FLIPKART_URL is not defined in the environment variables');
  }
  await this.navigateTo(url);
}
  async searchProduct(productName: string): Promise<void> {
   await this.searchProductInput.waitFor({ state: 'visible', timeout: 15000 });
   await this.searchProductInput.click();
    await this.searchProductInput.fill(productName);
  }
  async clickSearchButton(): Promise<void> {
     await this.searchButton.waitFor({ state: 'visible', timeout: 5000 });
     await this.searchButton.click();
  } 
  async closeLoginPopupIfVisible(): Promise<void> {
    if (await this.closeButton.isVisible().catch(() => false)) {
      await this.closeButton.click();
    }
}
}