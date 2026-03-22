import { octokit, personalRepositories, type AnyRepo } from "./client"

type Languages = Array<{ name: string; bytes: number }>

const excludedLangs = ['MDX', 'Shell', 'Batchfile', 'Makefile', 'HTML', 'CSS', 'JavaScript']

const languagesBytes = async (owner: string, repositories: AnyRepo[]) => {
  const result: Languages = []
  for (const { fork, name } of repositories) {
    if (fork) continue
    const { data: langs } = await octokit.rest.repos.listLanguages({ owner, repo: name })
    for (const [lang, bytes] of Object.entries(langs)) {
      // if (excludedLangs.includes(lang)) continue
      result.push({ name: lang, bytes })
    }
  }
  return result
}

export const personalReposLangsBytes = async () =>
  languagesBytes('lenixdev', personalRepositories)

export const orgsReposLangsBytes = async () => {
  const { data: orgs } = await octokit.rest.orgs.listForUser({ username: 'lenixdev' })
  const result: Languages = []
  for (const org of orgs) {
    const { data: repos } = await octokit.rest.repos.listForOrg({ org: org.login, per_page: 100 })
    const langs = await languagesBytes(org.login, repos)
    result.push(...langs)
  }
  return result
}

export const totalLangsBytes = async () => {
  const combined = [...await personalReposLangsBytes(), ...await orgsReposLangsBytes()]
  const merged = new Map<string, number>()
  for (const { name, bytes } of combined) merged.set(name, (merged.get(name) ?? 0) + bytes)
  return Array.from(merged, ([name, bytes]) => ({ name, bytes })).sort((a, b) => b.bytes - a.bytes)
}