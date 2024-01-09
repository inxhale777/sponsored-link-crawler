import workerpool from 'workerpool'
import { Browser } from 'puppeteer';

import GoogleCrawler from '../crawlers/google';
import BingCrawler from '../crawlers/bing';
import YahooCrawler from '../crawlers/yahoo';

import { launch } from '../puppeteer';

workerpool.worker({
    'google': async (pages: number, keyword: string): Promise<string[]> => {
        let browser: Browser;
        try {
            browser = await launch(true)
            const page = await browser.newPage()
            const crawler = new GoogleCrawler()

            return await crawler.run(page, pages, keyword)
        } catch (e) {
            throw e
        } finally {
            // @ts-ignore
            if (browser != null) await browser.close()
        }
    },
    'bing': async (pages: number, keyword: string): Promise<string[]> => {
        let browser: Browser;
        try {
            browser = await launch(true)
            const page = await browser.newPage()
            const crawler = new BingCrawler()

            return await crawler.run(page, pages, keyword)
        } catch (e) {
            throw e
        } finally {
            // @ts-ignore
            if (browser != null) await browser.close()
        }

    },
    'yahoo': async (pages: number, keyword: string): Promise<string[]> => {
        let browser: Browser;
        try {
            browser = await launch(true)
            const page = await browser.newPage()
            const crawler = new YahooCrawler()

            return await crawler.run(page, pages, keyword)
        } catch (e) {
            throw e
        } finally {
            // @ts-ignore
            if (browser != null) await browser.close()
        }

    }
})