// Usage: node scripts/record-secondlook.cjs [path-to-playwright]
const { chromium } = require(process.argv[2] || 'playwright');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function record() {
  const output = path.resolve(__dirname, '../public');
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    await page.goto(pathToFileURL(path.join(__dirname, 'secondlook-film.html')).href);
    const poster = await page.locator('canvas').screenshot();
    const [video] = await Promise.all([
      page.waitForEvent('download', { timeout: 45000 }),
      page.evaluate(() => window.recordFilm()),
    ]);
    await video.saveAs(path.join(output, 'secondlook-demo.webm'));
    await require('node:fs/promises').writeFile(path.join(output, 'secondlook-preview.png'), poster);
  } finally {
    await browser.close();
  }
}

record().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
