import { Page } from 'puppeteer';

import Logger from '../../core/logger';

export default class YahooCrawler {
  async run(page: Page, pages: number, keyword: string): Promise<string[]> {
    let result: string[] = [];

    // accept cookies first
    await page.goto('https://search.yahoo.com', {
      waitUntil: 'load',
    });

    if (page.url().includes('consent')) {
      // looks like we got redirected to https://consent.yahoo.com/
      Logger.info('YahooCrawler: cookie consent page, accepting all');

      await page.waitForSelector('form.consent-form');
      await page.click('form.consent-form button.accept-all');
      await page.waitForNetworkIdle({
        idleTime: 500,
      });
    }

    for (let i = 0; i < pages; i++) {
      Logger.info(`YahooCrawler: search for ${keyword}, page: ${i}`);

      const url = `https://search.yahoo.com/search;?p=${encodeURIComponent(keyword)}&b=${i * 10}`;
      await page.goto(url, {
        waitUntil: 'load',
      });

      result = result.concat(...await page.evaluate((): string[] => {
        const links: string[] = [];
        document.querySelectorAll('a[data-matarget="ad"]').forEach(e => {
          const link = e.getAttribute('href');
          if (link) {
            links.push(link);
          }
        });

        return links;
      }));
    }

    return result;
  }
}