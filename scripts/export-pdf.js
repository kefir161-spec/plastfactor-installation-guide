import { spawn } from 'node:child_process';
import { createServer as createHttpServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PDF_PATH = join(DIST, 'plastfactor-installation-guide.pdf');
const PORT = 4173;

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
};

function run(cmd, args, cwd = ROOT) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: 'inherit', shell: true });
    child.on('close', (code) => (code === 0 ? resolvePromise() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

function startStaticServer() {
  return new Promise((resolvePromise) => {
    const server = createHttpServer((req, res) => {
      let urlPath = req.url?.split('?')[0] || '/';
      if (urlPath === '/') urlPath = '/index.html';
      const filePath = join(DIST, urlPath);
      if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
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

async function main() {
  if (!existsSync(DIST)) {
    console.log('Building project...');
    await run('npm', ['run', 'build']);
  }

  const server = await startStaticServer();
  const url = `http://127.0.0.1:${PORT}/`;

  console.log(`Exporting PDF from ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 300000,
  });
  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000);
    page.setDefaultTimeout(120000);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForSelector('.cover', { timeout: 30000 });
    await new Promise((r) => setTimeout(r, 3000));

    await page.pdf({
      path: PDF_PATH,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: { top: '14mm', right: '14mm', bottom: '14mm', left: '14mm' },
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
