import { writeFileSync } from "fs"
import { totalLangsLOC } from "./loc"
import { totalLangsBytes } from "./langs"
import { totalCommits } from "./commits"

if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN missing')

const commits = await totalCommits()
const loc = await totalLangsLOC()
const langsBytes = await totalLangsBytes()

writeFileSync(
  process.cwd() + '/scripts/data.json',
  JSON.stringify({ commits, loc, langsBytes }, null, 2)
)