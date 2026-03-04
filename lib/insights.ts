import 'server-only'
import { Repository, RepositoryLanguageStats, Organization, Commit } from '@/lib/types'
import { wait } from 'lenix'
import { unstable_cache } from 'next/cache'
import { CACHE_REVALIDATION } from './utils'
import { fetchGithub } from '@/api/github'
import { fetchCodeTabs } from '@/api/codetabs'

const personalRepositories = async (token: string) => fetchGithub<Repository[]>('users/lenixdev/repos', token)

const repositoriesLanguages = <T,>(owner: string, repositories: Repository[] | undefined) => {
  let remainingCount = repositories?.length ?? 0
  return repositories?.reduce(async (acc, repository) => {
    const prevRepo = await acc
    await wait(5000)
    console.log(`${repository.name} was fetched from ${owner}, ${--remainingCount} more remaining`)
    const data = await fetchCodeTabs<T>(owner, repository.name)
    if (!data) return []
    return [...prevRepo, { [repository.name]: data} ]
  }, Promise.resolve([] as Array<{
    [key: NonNullable<typeof repositories>[number]["name"]]: T
  }>))
}

const personalLinesLinesOfCodes = async (token: string) => {
  const repositories = await personalRepositories(token)
  const personalRepositoriesLanguages = await (async <T,>() => repositoriesLanguages<T | undefined>('lenixdev', repositories))<Array<RepositoryLanguageStats>>()

  return personalRepositoriesLanguages?.reduce((acc, repository) => {
    const languages = Object.values(repository)[0]
    if (!languages) return 0
    return acc + languages.reduce((acc, language) => acc + language.lines, 0)
  }, 0)
}

const organizationLinesOfCodes = async (token: string) => {
  const organizations = await fetchGithub<Organization[]>('users/lenixdev/orgs', token)
  const organizationNames = organizations?.map(organization => organization.login)

  const linesOfCodes = await organizationNames?.reduce(async (acc, organizationName) => {
    if (!organizationName) return acc
    const previousOrganization = await acc
    const organizationRepositories = await fetchGithub<Repository[]>(`orgs/${organizationName}/repos`, token)
    const organizationsRepositoriesLanguages = await (async <T,>() => repositoriesLanguages<T>(organizationName, organizationRepositories))<Array<RepositoryLanguageStats>>()

    return [...previousOrganization, organizationsRepositoriesLanguages?.reduce((acc, repo) => {
      const languages = Object.values(repo)[0]
      return acc + languages.reduce((acc, language) => acc + language.lines, 0)
    }, 0)]
  }, Promise.resolve([] as (number | undefined)[]))
  return (linesOfCodes)?.reduce((acc, n) => (acc ?? 0) + (n ?? 0), 0)
}

const loc = async (token: string) => [await personalLinesLinesOfCodes(token), await organizationLinesOfCodes(token)].reduce((acc, n) => (acc ?? 0) + (n ?? 0), 0)

const personalCommits = async (token: string) => {
  type CommitDate = NonNullable<Commit["commit"]["author"]>["date"]
  const init = [] as CommitDate[]
  const repositories = await personalRepositories(token)

  return repositories?.reduce(async (acc, repository) => {
    const prevDates = await acc
    const commits = await fetchGithub<Commit[]>(`repos/LenixDev/${repository.name}/commits`, token)
    return [...prevDates, ...await (commits ?? []).reduce(async (acc, { commit: { author } }) => {
      const prevDate = await acc
      if (!author?.date) return prevDate
      const date = new Date(author.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
      console.log(date)
      return [...prevDate, date]
    }, Promise.resolve(init))]
  }, Promise.resolve(init))
}

const insights = async () => {
  const { GITHUB_TOKEN } = process.env
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable is not set')
  const commits = await personalCommits(GITHUB_TOKEN)
  return {
    // loc: await loc(GITHUB_TOKEN),
    commits
  }
}

export type Insights = Awaited<ReturnType<typeof insights>>

export const cachedInsights = unstable_cache(insights, ['insights'], { revalidate: CACHE_REVALIDATION})