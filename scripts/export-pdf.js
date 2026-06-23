import { spawn } from 'node:child_process';
import { createServer as createHttpServer } from 'node:http';
import { createReadStream, existsSync, statSync, unlinkSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const REPO_NAME = 'plastfactor-installation-guide';
const PDF_NAME = `${REPO_NAME}.pdf`;
const PORT = 4173;

const forGitHubPages = process.env.GITHUB_PAGES === 'true';
const BASE_PATH = forGitHubPages ? `/${REPO_NAME}` : '';
const PDF_PATH = join(forGitHubPages ? DIST : ROOT, PDF_NAME);

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

function run(cmd, args, options = {}) {
  const { cwd = ROOT, env = process.env } = options;

  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: 'inherit', shell: true, env });
    child.on('close', (code) => (code === 0 ? resolvePromise() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

function resolveDistPath(urlPath) {
  let path = decodeURIComponent(urlPath.split('?')[0] || '/');

  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    path = path.slice(BASE_PATH.length) || '/';
  }

  if (path === '/') path = '/index.html';

  const filePath = normalize(join(DIST, path));
  if (!filePath.startsWith(DIST)) return null;

  return filePath;
}

function startStaticServer() {
  return new Promise((resolvePromise) => {
    const server = createHttpServer((req, res) => {
      const filePath = resolveDistPath(req.url || '/');

      if (!filePath || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const ext = extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      createReadStream(filePath).pipe(res);
    });

    server.listen(PORT, () => resolvePromise(server));
  });
}

async function preparePageForPdf(page) {
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });

  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const img of document.images) {
      img.loading = 'eager';
    }

    let lastHeight = 0;
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const height = document.body.scrollHeight;

      for (let y = 0; y <= height; y += 500) {
        window.scrollTo(0, y);
        await delay(250);
      }

      window.scrollTo(0, 0);
      await delay(400);

      if (height === lastHeight) break;
      lastHeight = height;
    }

    await Promise.all(
      Array.from(document.images).map(
        (img) =>
          new Promise((resolve) => {
            const done = () => resolve();
            if (img.complete && img.naturalWidth > 0) {
              resolve();
              return;
            }
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
            const src = img.currentSrc || img.src;
            if (src) img.src = src;
          }),
      ),
    );

    await delay(1000);
  });

  const imageStats = await page.evaluate(() => {
    const images = Array.from(document.images);
    return {
      total: images.length,
      loaded: images.filter((img) => img.complete && img.naturalWidth > 0).length,
      failed: images
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.src),
    };
  });

  console.log(`Images loaded: ${imageStats.loaded}/${imageStats.total}`);
  if (imageStats.failed.length > 0) {
    console.warn('Failed images:', imageStats.failed);
  }

  await page.emulateMediaType('print');
}

async function main() {
  const distPdf = join(DIST, PDF_NAME);
  let keepDist = false;

  if (existsSync(distPdf)) {
    try {
      unlinkSync(distPdf);
    } catch {
      keepDist = true;
      console.log('PDF in dist is open — rebuilding assets without clearing dist...');
    }
  }

  console.log(forGitHubPages ? 'Building for GitHub Pages...' : 'Building for local export...');
  await run('npm', ['run', 'build'], {
    env: forGitHubPages
      ? { ...process.env, GITHUB_PAGES: 'true' }
      : { ...process.env, GITHUB_PAGES: '', ...(keepDist ? { VITE_KEEP_DIST: 'true' } : {}) },
  });

  const server = await startStaticServer();
  const url = `http://127.0.0.1:${PORT}${BASE_PATH}/`;

  console.log(`Exporting PDF from ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 600000,
    args: process.platform === 'linux' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000);
    page.setDefaultTimeout(120000);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForSelector('.cover', { timeout: 60000 });
    await preparePageForPdf(page);

    await page.pdf({
      path: PDF_PATH,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    if (!existsSync(PDF_PATH)) {
      throw new Error('PDF file was not created');
    }

    const sizeKb = Math.round(statSync(PDF_PATH).size / 1024);
    console.log(`PDF saved: ${PDF_PATH} (${sizeKb} KB)`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
