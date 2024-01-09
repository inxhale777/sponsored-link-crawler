import {Page} from 'puppeteer'
import Logger from "../../core/logger";

export default class GoogleCrawler {
    async run(page: Page, pages: number, keyword: string): Promise<string[]> {
        let result: string[] = []

        for (let i = 0; i < pages; i++) {
            Logger.info(`GoogleCrawler: search for ${keyword}, page: ${i}`)

            // multiple page number by 10 for proper iterating over results
            await page.goto(`https://google.com/search?q=${encodeURIComponent(keyword)}&start=${i * 10}`, {
                waitUntil: "load",
            })

            result = result.concat(await page.evaluate((): string[] => {
                const pageResult: string[] = []
                document.querySelectorAll('a[data-pcu]').forEach(e => {
                    const link = e.getAttribute('data-pcu')
                    if (link) {
                        pageResult.push(link)
                    }
                })

                return pageResult
            }))
        }

        return result
    }
}
