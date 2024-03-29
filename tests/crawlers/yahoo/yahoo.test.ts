import { Browser, Page } from 'puppeteer';
import { describe, expect } from '@jest/globals';

import YahooCrawler from '../../../src/crawlers/yahoo';
import Logger from '../../../src/core/logger';
import { launch } from '../../../src/puppeteer';

const timeout = 120 * 1000;

describe('yahoo crawler test', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await launch(false);
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (page) {
      await page.close();
    }

    await browser.close();
  });

  it('should return ads links', async () => {
    const crawler = new YahooCrawler();
    const result = await crawler.run(page, 5, 'ads marketing platform');

    Logger.info(`yahoo crawler returned links`, [result.join(', ')]);

    // expect at least one link will be returned
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0]).toContain('https://');
  }, timeout);
});