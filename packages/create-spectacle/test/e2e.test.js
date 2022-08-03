// TODO(e2e): Convert to TS.
const puppeteer = require('puppeteer');

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // TODO: FIGURE THIS OUT BETTER
      // TOOD: Currently using -- PUPPETEER_EXPERIMENTAL_CHROMIUM_MAC_ARM=true pnpm puppeteer:install
      executablePath: "/Users/rye/scm/fmd/spectacle/node_modules/.pnpm/puppeteer@16.0.0/node_modules/puppeteer/.local-chromium/mac_arm-1022525/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
    });
    page = await browser.newPage();
  });

  it('contains the welcome text', async () => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.example-text');
    const text = await page.$eval('.example-text', (e) => e.textContent);
    expect(text).toContain('js');
  });

  afterAll(() => browser.close());
});
