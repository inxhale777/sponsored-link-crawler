import workerpool from 'workerpool'
import {Browser, Page} from 'puppeteer';

import GoogleCrawler from '../crawlers/google';
import BingCrawler from '../crawlers/bing';
import YahooCrawler from '../crawlers/yahoo';

import { launch } from '../puppeteer';

interface AbstractCrawler {
    run(page: Page, pages: number, keyword: string): Promise<string[]>
}

workerpool.worker({
    'crawl': async(crawlerName: string, pages: number, keyword: string) => {
        let crawler: AbstractCrawler;
        let browser: Browser;

        switch (crawlerName) {
            case 'google':
                crawler = new GoogleCrawler()
                break
            case 'yahoo':
                crawler = new YahooCrawler()
                break
            case 'bing':
                crawler = new BingCrawler()
                break
            default:
                throw new Error(`invalid crawler name: ${crawlerName}`)
        }

        try {
            browser = await launch(true)
            const page = await browser.newPage()

            return await crawler.run(page, pages, keyword)
        } catch (e) {
            throw e
        } finally {
            // @ts-ignore
            if (browser != null) await browser.close()
        }
    }
})