import {Page} from 'puppeteer'
import Logger from "../../core/logger";

export default class BingCrawler {
    async run(page: Page, pages: number, keyword: string): Promise<string[]> {
        let redirects: string[] = [];

        for (let i = 0; i < pages; i++) {
            Logger.info(`BingCrawler: search for ${keyword}, page: ${i}`)

            // iterate over 1-10, 11-21, 21-30
            const url = `https://bing.com/search?q=${encodeURIComponent(keyword)}&first=${i*10}`;
            await page.goto(url, {
                waitUntil: 'load'
            })

            redirects = redirects.concat(...await page.evaluate((): string[] => {
                const pageAdsRedirects: string[] = []
                document.querySelectorAll('li.b_ad h2 a').forEach(e => {
                    const link = e.getAttribute('href')
                    if (link) {
                        pageAdsRedirects.push(link)
                    }
                })

                return pageAdsRedirects
            }))
        }

        // since we cant get raw urls from bing page, go to each link, wait for redirect and store original ad url
        const result: string[] = [];
        for (const r of redirects) {
            await page.goto(r, {
                waitUntil: 'load'
            })

            result.push(page.url())
        }

        return result
    }
}