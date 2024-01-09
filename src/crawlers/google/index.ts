import {Page} from 'puppeteer'

export default class GoogleCrawler {
    async run(page: Page, pages: number, keywords: string[]): Promise<string[]> {
        // build query string like: ("KEYWORD") AND ("KEYWORD") AND ("ANOTHER KEYWORD")
        const query = encodeURIComponent(keywords.map(k => `("${k}")`).join(' AND '))
        let result: string[] = []

        for (let i = 0; i < pages; i++) {
            // multiple page number by 10 for proper iterating over results
            await page.goto(`https://google.com/search?q=${query}&start=${i * 10}`, {
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
