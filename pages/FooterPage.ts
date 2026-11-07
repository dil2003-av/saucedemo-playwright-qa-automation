
import { Page, Locator } from '@playwright/test';

export class FooterPage {
  readonly page: Page;

  readonly footer: Locator;
  readonly copyrightText: Locator;
  readonly socialLinks: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.footer = page.locator('.footer');
    this.copyrightText = page.locator('.footer_copy');
    this.socialLinks = page.locator('.social');
    this.twitterLink = page.locator('.social_twitter a');
    this.facebookLink = page.locator('.social_facebook a');
    this.linkedinLink = page.locator('.social_linkedin a');
  }

  async waitForFooter() {
    await this.footer.waitFor({ state: 'visible' });
  }
}
