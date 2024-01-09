import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth'
import {Browser, Page} from 'puppeteer';
import {describe, expect} from '@jest/globals'

import GoogleCrawler from '../../../src/crawlers/google';
import Logger from '../../../src/core/logger'

puppeteer.use(stealth())

const timeout = 15 * 1000

describe('google crawler test',  () => {
    let browser: Browser;
    let page: Page

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: "new",
        });

        page = await browser.newPage()
    })

    afterAll(async () => {
        if (page) {
            await page.close()
        }

        await browser.close()
    })

    it('should return ads links', async () => {
        const crawler = new GoogleCrawler()
        const result = await crawler.run(page, 5, ['trello', 'analogs'])

        Logger.info('Google Crawler returned ads', [result.join(', ')])

        // expect at least one link will be returned
        expect(result.length).toBeGreaterThanOrEqual(1)
        expect(result[0]).toContain('https://')

    }, timeout)
});