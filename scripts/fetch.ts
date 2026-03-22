import { writeFileSync } from "fs"
import { totalLangsBytes } from "./langs"
import { totalCommits } from "./commits"
import { totalLinesAdded } from "./loc"

if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN missing')

const loc = await totalLinesAdded()
const commits = await totalCommits()
const langsBytes = await totalLangsBytes()

writeFileSync(
  process.cwd() + '/scripts/data.json',
  JSON.stringify({ loc , commits, langsBytes }, null, 2)
)