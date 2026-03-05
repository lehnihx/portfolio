import 'server-only'
import { Repository, RepositoryLanguageStats, Organization, Commit } from '@/lib/types'
import { wait } from 'lenix'
import { unstable_cache } from 'next/cache'
import { CACHE_REVALIDATION } from './utils'
import { fetchGithub } from '@/api/github'
import { fetchCodeTabs } from '@/api/codetabs'

const accumulationInitializer = [] as NonNullable<Commit["commit"]["author"]>["date"][]

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
  const repositories = await personalRepositories(token)

  return repositories?.reduce(async (acc, repository) => {
    const prevDates = await acc
    const fetchRepositoryCommits = async (pageIndex: number): Promise<Commit[]> => {
      const page = await fetchGithub<Commit[]>(`repos/LenixDev/${repository.name}/commits?per_page=100&page=${pageIndex}`, token)
      if (!page?.length || page.length < 100) return page ?? []
      return [...page, ...await fetchRepositoryCommits(pageIndex + 1)]
    }
    const commits = await fetchRepositoryCommits(1)
    return [...prevDates, ...await (commits ?? []).reduce(async (acc, { commit: { author } }) => {
      const prevDate = await acc
      if (!author?.date) return prevDate
      const date = new Date(author.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
      return [...prevDate, date]
    }, Promise.resolve(accumulationInitializer))]
  }, Promise.resolve(accumulationInitializer))
}

const organizationsCommits = async (token: string) => {
  const organizations = await fetchGithub<Organization[]>('users/lenixdev/orgs', token)
  return organizations?.reduce(async (acc, { login }) => {
    const prevAcc = await acc
    const organizationRepositories = await fetchGithub<Repository[]>(`orgs/${login}/repos`, token)
    return [...prevAcc, ...await(organizationRepositories ?? [])?.reduce(async (acc, { name }) => {
      const prevAcc = await acc
      const fetchRepositoryCommits = async (pageIndex: number): Promise<Commit[]> => {
      const page = await fetchGithub<Commit[]>(`repos/${login}/${name}/commits?per_page=100&page=${pageIndex}`, token)
      if (!page?.length || page.length < 100) return page ?? []
      return [...page, ...await fetchRepositoryCommits(pageIndex + 1)]
    }
      const commits = await fetchRepositoryCommits(1)
      return [...prevAcc, ...await (commits ?? []).reduce(async (acc, { commit: { author } }) => {
        const prevDate = await acc
        if (!author?.date) return prevDate
        const date = new Date(author.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
        return [...prevDate, date]
      }, Promise.resolve(accumulationInitializer))]
    }, Promise.resolve(accumulationInitializer))]
  }, Promise.resolve(accumulationInitializer))
}

const insights = async () => {
  const { GITHUB_TOKEN } = process.env
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable is not set')
  const validPersonalCommits = await personalCommits(GITHUB_TOKEN)
  const validOrganizationCommits = await organizationsCommits(GITHUB_TOKEN)
  const commits = validPersonalCommits && validOrganizationCommits ? [...validPersonalCommits, ...validOrganizationCommits] : []
  console.log(commits.length)
  return {
    // loc: await loc(GITHUB_TOKEN),
    commits
  }
}

export type Insights = Awaited<ReturnType<typeof insights>>

export const cachedInsights = unstable_cache(insights, ['insights'], { revalidate: 1 })