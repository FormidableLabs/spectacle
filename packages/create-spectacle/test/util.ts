import path from 'path';
import { promises as fs } from 'fs';

const ROOT = path.resolve(__dirname, '../../..');
const DL_DIR = path.join(ROOT, '.puppeteer');
const IS_MAC = process.platform.startsWith('darwin');

// Infer local chrome/chromium location and set options.
// TODO: Abstract this to a common root file if multiple packages use.
export const getLaunchOptions = async () => {
  // CI: Assume GH Actions environment and use local chrome.
  if (process.env.CI === 'true') {
    return {
      headless: true,
      args: [
        '--ignore-certificate-errors',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    };
  }

  // Localdev.
  // Check if `pnpm puppeteer:install` was run.
  const chromeDirs = await fs.readdir(DL_DIR).catch((err) => {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  });
  if (chromeDirs.length > 1) {
    throw new Error(
      `Found multiple chrome installs in ${DL_DIR}. Please run \`pnpm puppeteer:install\` to install only 1.`
    );
  }
  const chromeDir = chromeDirs[0] || null;
  let executablePath;
  if (IS_MAC) {
    if (chromeDir) {
      // Downloaded chrome
      executablePath = path.join(
        DL_DIR,
        chromeDir,
        'chrome-mac/Chromium.app/Contents/MacOS/Chromium'
      );
    } else {
      // System chrome
      executablePath =
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    }
  }

  // Bail on unsupported platforms (and then implement later).
  if (!executablePath) {
    throw new Error(`Unsupported platform: ${process.platform}`);
  }

  return {
    ...(executablePath ? { executablePath } : {}),
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };
};
