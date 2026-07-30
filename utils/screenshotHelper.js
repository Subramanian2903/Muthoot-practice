import fs from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';

const screenshotsDir = path.join(process.cwd(), 'screenshots');

export async function saveFailureScreenshot(page, prefix = 'Failure') {
  try {
    if (!page || page.isClosed && page.isClosed()) return null;
    await fsp.mkdir(screenshotsDir, { recursive: true });
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${prefix}_${ts}.png`;
    const filePath = path.join(screenshotsDir, fileName);

    try {
      await page.screenshot({ path: filePath, fullPage: true, timeout: 5000, animations: 'disabled' });
    } catch (err) {
      if (page.isClosed && page.isClosed()) return null;
      await page.screenshot({ path: filePath, fullPage: false, timeout: 5000, animations: 'disabled' });
    }

    return filePath;
  } catch (err) {
    return null;
  }
}

export default { saveFailureScreenshot };
