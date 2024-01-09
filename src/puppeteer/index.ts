import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

import { Browser } from 'puppeteer';

puppeteer.use(stealth());

export async function launch(headless: boolean): Promise<Browser> {
  return puppeteer.launch({
    headless: headless ? 'new' : false,
  });
}