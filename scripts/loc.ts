import { safeRequest, wait } from "lenix"
import { ownerRepos } from "./client"

interface RepositoryLanguageStats {
  language: string
  files: number
  lines: number
  blanks: number
  comments: number
  linesOfCode: number
}

type LangsLOC = Record<string, number>

const repositoriesLanguages = async (repositories: typeof ownerRepos) => {
  const result: Record<string, RepositoryLanguageStats[]>[] = []
  let remainingCount = repositories.length
  for (const { name, fork, owner: { login } } of repositories) {
    if (fork) continue

    await wait(5000)
    console.log(`${name} was fetched from ${login}, ${--remainingCount} more remaining`)
    const response = await safeRequest("api.codetabs.com", `v1/loc/?github=${login}/${name}`)
    if (!response.ok) { console.log(response.statusText); continue }

    const data = await response.json() as RepositoryLanguageStats[]
    result.push({ [name]: data })
  }
  return result
}

export const totalLangsLOC = async () => {
  const langsLOC: LangsLOC = {}
  for (const lang of await repositoriesLanguages(ownerRepos)) {
    const languages = Object.values(lang)[0]
    for (const language of languages)
      langsLOC[language.language] = (langsLOC[language.language] ?? 0) + language.lines
  }
  return langsLOC
}