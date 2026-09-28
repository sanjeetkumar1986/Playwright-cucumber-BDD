import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './custom-world';
import dotenv from 'dotenv';
import path from 'path';

// Loads the variables from the root .env file into process.env if present
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  // If running in CI or HEADED isn't explicitly set to 'true', run headless
  const isCI = process.env.CI === 'true';
  const isHeadless = isCI || process.env.HEADED !== 'true';

  this.browser = await chromium.launch({
    headless: isHeadless,
    slowMo: isHeadless ? 0 : 500,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  // Register locator handler inside the hook after page is created
  const closeButton = this.page.locator(
    'span._30XB9F, button._2KpZ6l._2doB4z, span[role="button"]:has-text("✕")'
  );

  await this.page.addLocatorHandler(closeButton, async () => {
    await closeButton.click();
  });
});

After(async function (this: CustomWorld, { result, pickle }) {
  if (result?.status === Status.FAILED && this.page) {
    const uniqueName = `${pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;
    const screenshot = await this.page.screenshot({
      path: `./allure-results/${uniqueName}-failure.png`,
      fullPage: true,
    });
    this.attach(screenshot, 'image/png');
  }

  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});