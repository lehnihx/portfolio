import { safeRequest, wait } from "lenix"
import { octokit, personalRepositories, type AnyRepo } from "./client"

interface RepositoryLanguageStats {
  language: string
  files: number
  lines: number
  blanks: number
  comments: number
  linesOfCode: number
}

type LangsLOC = Record<string, number>

const repositoriesLanguages = async (owner: string, repositories: AnyRepo[]) => {
  const result: Record<string, RepositoryLanguageStats[]>[] = []
  let remainingCount = repositories.length
  for (const { name } of repositories) {
    await wait(5000)
    console.log(`${name} was fetched from ${owner}, ${--remainingCount} more remaining`)
    const response = await safeRequest("api.codetabs.com", `v1/loc/?github=${owner}/${name}`)
    if (!response.ok) { console.log(response.statusText); continue }
    const data = await response.json() as RepositoryLanguageStats[]
    result.push({ [name]: data })
  }
  return result
}

const langsLOCs = async (target: string, rawRepos: AnyRepo[]) => {
  const langsLOC: LangsLOC = {}
  for (const lang of await repositoriesLanguages(target, rawRepos)) {
    const languages = Object.values(lang)[0]

    for (const language of languages) {
      langsLOC[language.language] = (langsLOC[language.language] ?? 0) + language.lines
    }
  }
  return langsLOC
}

export const totalLangsLOC = async () => {
  const { data: orgs } = await octokit.rest.orgs.listForUser({ username: 'lenixdev' })
  const orgLangs: LangsLOC = {}

  for (const { login: org } of orgs) {
    const { data: repos } = await octokit.rest.repos.listForOrg({ org, per_page: 100 })
    const langs = await langsLOCs(org, repos)
    if (!langs) continue

    for (const lang in langs) orgLangs[lang] = (orgLangs[lang] ?? 0) + langs[lang]
  }

  const personal = await langsLOCs("lenixdev", personalRepositories)
  const merged: LangsLOC = {}

  for (const [lang, lines] of Object.entries(personal)) merged[lang] = (merged[lang] ?? 0) + lines
  for (const [lang, lines] of Object.entries(orgLangs)) merged[lang] = (merged[lang] ?? 0) + lines
  return merged
}