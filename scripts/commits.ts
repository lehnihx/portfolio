import { octokit, personalRepositories } from "./client"

const VALID_NAMES = ['Lenix', 'lenixdev', 'LenixDev', 'Lenixx', 'tripplerscripts', 'lenix']

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

export const personalCommits = async () => {
  const dates: string[] = []
  for (const { owner, name } of personalRepositories) {
    dates.push(...await repoDates(owner.login, name))
  }
  return dates
}

export const organizationsCommits = async () => {
  const { data: orgs } = await octokit.rest.orgs.listForUser({ username: 'lenixdev' })
  const dates: string[] = []
  for (const org of orgs) {
    const { data: repos } = await octokit.rest.repos.listForOrg({ org: org.login, per_page: 100 })
    for (const { name } of repos) {
      dates.push(...await repoDates(org.login, name))
    }
  }
  return dates
}