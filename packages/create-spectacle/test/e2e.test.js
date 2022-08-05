// TODO(e2e): Convert to TS.
const puppeteer = require('puppeteer');
const { getLaunchOptions } = require('./util');

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    const launchOpts = await getLaunchOptions();
    browser = await puppeteer.launch(launchOpts);
    page = await browser.newPage();
  });

  it('contains last slide text', async () => {
    await page.goto('http://localhost:3000');

    // TODO: GET BETTER SELECTORS
    const sel = "div[font-family='header'][font-size='h2']";
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
