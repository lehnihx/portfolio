import { wait } from "lenix"
import { octokit, ownerRepos } from "./client"

const getStats = async (owner: string, repo: string) => {
  const { data, status } = await octokit.rest.repos.getContributorsStats({ owner, repo })
  if (status === 200) return data

  console.warn(`retrying ${owner}/${repo}...`)
  await wait(3000)

  // 😌 consistency is key in life; f*ck it I'm not letting microsoft go 😂
  return getStats(owner, repo)
}

export const totalLinesAdded = async () => {
  const total: { added: number, deleted: number } = { added: 0, deleted: 0 }
  for (const { name, owner } of ownerRepos) {

    const stats = await getStats(owner.login, name)
    for (const contributor of stats) {
      if (contributor.author?.login !== 'LenixDev') continue

      for (const week of contributor.weeks) {
        total.added += week.a ?? 0
        total.deleted += week.d ?? 0
      }
    }
  }
  return total
}