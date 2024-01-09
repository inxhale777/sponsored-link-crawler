import { Page } from 'puppeteer'

export default interface Crawler {
    run: (page: Page, pages: number, keywords: string[]) => Promise<string[]>
}