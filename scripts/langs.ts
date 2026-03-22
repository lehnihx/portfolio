import { octokit, ownerRepos } from "./client"

type Languages = Array<{ name: string; bytes: number }>

export const totalLangsBytes = async () => {
  const result: Languages = []
  for (const { fork, name, owner: { login: owner } } of ownerRepos) {
    if (fork) continue
    const { data: langs } = await octokit.rest.repos.listLanguages({ owner, repo: name })
    for (const [lang, bytes] of Object.entries(langs))
      result.push({ name: lang, bytes })
  }
  const merged = new Map<string, number>()
  for (const { name, bytes } of result) merged.set(name, (merged.get(name) ?? 0) + bytes)
  return Array.from(merged, ([name, bytes]) => ({ name, bytes })).sort((a, b) => b.bytes - a.bytes)
}
const excludedLangs = ['MDX', 'Shell', 'Batchfile', 'Makefile', 'HTML', 'CSS', 'JavaScript']
// if (excludedLangs.includes(lang)) continue