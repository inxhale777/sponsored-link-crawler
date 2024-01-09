import workerpool from 'workerpool'
import {Browser} from "puppeteer";

import GoogleCrawler from "../crawlers/google";
import BingCrawler from "../crawlers/bing";
import {launch} from '../puppeteer';
import YahooCrawler from "../crawlers/yahoo";

workerpool.worker({
    'google': async (pages: number, keywords: string[]): Promise<string[]> => {
        let browser: Browser;
        try {
            browser = await launch(true)
            const page = await browser.newPage()
            const crawler = new GoogleCrawler()

            return await crawler.run(page, pages, keywords)
        } catch (e) {
            throw e
        } finally {
            // @ts-ignore
            if (browser != null) await browser.close()
        }
    },
    'bing': async (pages: number, keywords: string[]): Promise<string[]> => {
        let browser: Browser;
        try {
            browser = await launch(true)
            const page = await browser.newPage()
            const crawler = new BingCrawler()

            return await crawler.run(page, pages, keywords)
        } catch (e) {
            throw e
        } finally {
            // @ts-ignore
            if (browser != null) await browser.close()
        }

    },
    'yahoo': async (pages: number, keywords: string[]): Promise<string[]> => {
        let browser: Browser;
        try {
            browser = await launch(true)
            const page = await browser.newPage()
            const crawler = new YahooCrawler()

            return await crawler.run(page, pages, keywords)
        } catch (e) {
            throw e
        } finally {
            // @ts-ignore
            if (browser != null) await browser.close()
        }

    }
})