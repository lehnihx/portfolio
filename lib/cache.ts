import fs from 'fs/promises'
import path from 'path'

const CACHE_FILE = path.join('/tmp', 'portfolio-cache.json')
const TTL = 24 * 60 * 60 * 1000

export async function getPortfolioContext(): Promise<string> {
  try {
    const raw = await fs.readFile(CACHE_FILE, 'utf-8')
    const { timestamp, content } = JSON.parse(raw)
    if (Date.now() - timestamp < TTL) return content
  } catch {}

  const content = await scrapePortfolio()
  await fs.writeFile(CACHE_FILE, JSON.stringify({ timestamp: Date.now(), content }))
  return content
}

async function scrapePortfolio(): Promise<string> {
  const chromium = await import('@sparticuz/chromium-min')
  const puppeteer = await import('puppeteer-core')

  const browser = await puppeteer.default.launch({
    args: chromium.default.args,
    executablePath: await chromium.default.executablePath(
      'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
    ),
    headless: true,
  })

  const page = await browser.newPage()
  await page.goto('https://lenix.dev', { waitUntil: 'networkidle0', timeout: 30000 })
  const text = await page.evaluate(() => document.body.innerText)
  await browser.close()

  return text.replace(/\s+/g, ' ').trim().slice(0, 8000)
}