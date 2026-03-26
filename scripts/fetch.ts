import { totalLangsBytes } from "./langs"
import { totalCommits } from "./commits"
import { totalLinesAdded } from "./loc"
import { caughtFetch } from "lenix"

if (typeof process.env.GITHUB_TOKEN !== 'string') throw new Error('GITHUB_TOKEN missing')
if (typeof process.env.GIST_ID !== 'string') throw new Error('GIST_ID missing')
if (typeof process.env.GH_PAT !== 'string') throw new Error('GH_PAT missing')

const loc = await totalLinesAdded()
const commits = await totalCommits()
const langsBytes = await totalLangsBytes()

const content = JSON.stringify({ loc, commits, langsBytes })

const res = await caughtFetch('api.github.com', `gists/${process.env.GIST_ID}`, {
  method: 'PATCH',
  headers: {
    'Authorization': `token ${process.env.GH_PAT}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    files: { 'data.json': { content } }
  })
})

if (!res.ok) throw new Error(`Gist PATCH failed: ${res.status} ${await res.text()}`)
console.info('Gist updated.')