import { octokit, ownerRepos, VALID_NAMES } from "./client"

// skip more that 1 yr

const repoDates = async (owner: string, repo: string) => {
  const dates: string[] = []
  const pages = octokit.paginate.iterator(octokit.rest.repos.listCommits, { owner, repo, per_page: 100 })
  for await (const { data } of pages) {
    for (const { commit } of data) {
      if (!VALID_NAMES.includes(commit.author?.name ?? '')) continue
      if (!commit.author?.date) continue
      dates.push(new Date(commit.author.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      }))
    }
  }
  return dates
}

export const totalCommits = async () => {
  const dates: string[] = []
  for (const { owner, name } of ownerRepos)
    dates.push(...await repoDates(owner.login, name))
  return dates
}