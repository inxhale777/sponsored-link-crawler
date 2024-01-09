import puppeteer from 'puppeteer-extra';
import {Browser, Page} from "puppeteer";
import stealth from "puppeteer-extra-plugin-stealth";

puppeteer.use(stealth())

export async function launch(headless: boolean): Promise<Browser> {
    return puppeteer.launch({
        headless: headless ? 'new' : false,
    });
}