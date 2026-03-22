import { wait } from "lenix"
import { octokit, ownerRepos } from "./client"

const getStats = async (owner: string, repo: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const { data, status } = await octokit.rest.repos.getContributorsStats({ owner, repo })
    if (status === 200) return data
    console.warn(`retrying ${owner}/${repo}...`)
    await wait(3000)
  }
  console.warn("failed to get stats for", owner, repo)
  return []
}

export const totalLinesAdded = async () => {
  let total = 0
  for (const { name, owner } of ownerRepos) {

    const stats = await getStats(owner.login, name)
    for (const contributor of stats) {
      if (contributor.author?.login !== 'LenixDev') continue

      for (const week of contributor.weeks) total += week.a ?? 0
    }
  }
  return total
}