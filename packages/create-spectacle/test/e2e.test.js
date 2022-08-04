// TODO(e2e): Convert to TS.
const puppeteer = require('puppeteer');

// Infer options.
const IS_CI = process.env.CI === 'true';
const DEV_OPTIONS = {
  // TODO: FIGURE THIS OUT BETTER
  // TOOD: Currently using -- PUPPETEER_EXPERIMENTAL_CHROMIUM_MAC_ARM=true pnpm puppeteer:install
  executablePath:
    '/Users/rye/scm/fmd/spectacle/node_modules/.pnpm/puppeteer@16.0.0/node_modules/puppeteer/.local-chromium/mac_arm-1022525/chrome-mac/Chromium.app/Contents/MacOS/Chromium'
};
const CI_OPTIONS = {
  executablePath: '/usr/bin/google-chrome-stable',
  headless: true,
  args: [
    '--ignore-certificate-errors',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu'
  ]
};
const LAUNCH_OPTS = IS_CI ? CI_OPTIONS : DEV_OPTIONS;

describe('App.js', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch(LAUNCH_OPTS);
    page = await browser.newPage();
  });

  it('contains the welcome text', async () => {
    await page.goto('http://localhost:3000');

    // TODO: GET BETTER SELECTORS
    const sel = 'div[font-family=\'header\'][font-size=\'h1\']';
    await page.waitForSelector(sel);
    const text = await page.$eval(sel, (e) => e.textContent);

    // TODO: SWITH TO EACH TYPE OF OUTPUT
    expect(text).toContain('jsx');
  });

  afterAll(() => {
    if (browser) {
      browser.close();
    }
  });
});
