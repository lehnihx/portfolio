import { writeFileSync } from "fs"
// import { totalLinesOfCodes } from "./loc"
import { organizationsCommits, personalCommits } from "./commits"
// import { organizationsRepositoriesLanguagesBytes, personalRepositoriesLanguagesBytes } from "./langs"

if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN missing')
  
// const { GITHUB_TOKEN } = process.env


const validPersonalCommits = await personalCommits()
const validOrganizationCommits = await organizationsCommits()
const commits = validPersonalCommits && validOrganizationCommits ? [...validPersonalCommits, ...validOrganizationCommits] : []
// const loc = await totalLinesOfCodes(GITHUB_TOKEN)
// const validPersonalLangsBytes = await personalRepositoriesLanguagesBytes(GITHUB_TOKEN)
// const validOrganizationLangsBytes = await organizationsRepositoriesLanguagesBytes(GITHUB_TOKEN)
// const langsBytes = (() => {
//   const combined = [...(validPersonalLangsBytes ?? []), ...(validOrganizationLangsBytes ?? [])]
//   const merged = new Map<string, number>()
//   for (const { name, bytes } of combined) merged.set(name, (merged.get(name) ?? 0) + bytes)
//   return Array.from(merged, ([name, bytes]) => ({ name, bytes })).sort((a, b) => b.bytes - a.bytes)
// })()

writeFileSync(
  process.cwd() + '/src/data.json',
  JSON.stringify({ commits }, null, 2)
)