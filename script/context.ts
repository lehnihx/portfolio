import * as fs from 'fs'
import * as cheerio from 'cheerio'

(async () => {
  const html = await fetch('http://localhost:3000').then(r => r.text())
  const $ = cheerio.load(html)
  const context = $('body').text().replace(/\s+/g, ' ').trim()
  fs.writeFileSync('./script/context.txt', context)
  console.info('Context saved to context.txt for AI Assistant')
})()