import type { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { getLaunchOptions } from './util';

describe('App.js', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    const launchOpts = await getLaunchOptions();
    browser = await puppeteer.launch(launchOpts);
    page = await browser.newPage();
  });

  it('contains last slide text', async () => {
    await page.goto('http://localhost:3000');

    // TODO: GET BETTER SELECTORS
    const sel = `div[font-family='header'][font-size='h2']`;
    await page.waitForSelector(sel);
    const text = await page.$eval(sel, (e) => e.textContent);
    expect(text).toContain('Made with');
  });

  afterAll(() => {
    if (browser) {
      browser.close();
    }
  });
});
