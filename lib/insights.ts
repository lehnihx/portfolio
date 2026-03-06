import 'server-only'
import { Repository, RepositoryLanguageStats, Organization, Commit, Language, Languages } from '@/lib/types'
import { wait } from 'lenix'
import { unstable_cache } from 'next/cache'
import { CACHE_REVALIDATION } from './utils'
import { fetchGithub } from '@/api/github'
import { fetchCodeTabs } from '@/api/codetabs'

const accumulationInitializer = [] as NonNullable<Commit["commit"]["author"]>["date"][]
const commitsAuthors = ['Lenix', 'lenixdev', 'LenixDev', 'Lenixx', 'tripplerscripts', 'lenix']
const excludedLangs = ['HTML', 'MDX', 'CSS', 'JavaScript']

const personalRepositories = async (token: string) => fetchGithub<Repository[]>('users/lenixdev/repos', token)

const repositoriesLanguages = <T>(owner: string, repositories: Repository[] | undefined) => {
  let remainingCount = repositories?.length ?? 0
  return repositories?.reduce(async (acc, repository) => {
    const prevAcc = await acc
    await wait(5000)
    console.log(`${repository.name} was fetched from ${owner}, ${--remainingCount} more remaining`)
    const data = await fetchCodeTabs<T>(owner, repository.name)
    if (!data) return []
    return [...prevAcc, { [repository.name]: data} ]
  }, Promise.resolve([] as Array<{
    [key: NonNullable<typeof repositories>[number]["name"]]: T
  }>))
}

const personalLinesLinesOfCodes = async (token: string) => {
  const repository = await personalRepositories(token)
  const personalRepositoriesLanguages = await repositoriesLanguages<Array<RepositoryLanguageStats>>('lenixdev', repository)

  return personalRepositoriesLanguages?.reduce((acc, repository) => {
    const languages = Object.values(repository)[0]
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
    const organizationsRepositoriesLanguages = await repositoriesLanguages<Array<RepositoryLanguageStats>>(organizationName, organizationRepositories)

    return [...previousOrganization, organizationsRepositoriesLanguages?.reduce((acc, repository) => {
      const languages = Object.values(repository)[0]
      return acc + languages.reduce((acc, language) => acc + language.lines, 0)
    }, 0)]
  }, Promise.resolve([] as (number | undefined)[]))
  return (linesOfCodes)?.reduce((acc, n) => (acc ?? 0) + (n ?? 0), 0)
}

const totalLinesOfCodes = async (token: string) => [await personalLinesLinesOfCodes(token), await organizationLinesOfCodes(token)].reduce((acc, n) => (acc ?? 0) + (n ?? 0), 0)

const fetchRepositoryCommits = async (pageIndex: number, repositoryName: string, token: string): Promise<Commit[]> => {
  const page = await fetchGithub<Commit[]>(`repos/LenixDev/${repositoryName}/commits?per_page=100&page=${pageIndex}`, token)
  if (!page?.length || page.length < 100) return page ?? []
  return [...page, ...await fetchRepositoryCommits(pageIndex + 1, repositoryName, token)]
}

const repositoriesDates = async (repositories: Repository[], token: string) => {
  return repositories?.reduce(async (acc, { name }) => {
    const prevAcc = await acc
    const commits = await fetchRepositoryCommits(1, name, token) ?? []
    return [...prevAcc, ...await commits.reduce(async (acc, { commit: { author } }) => {
      const prevAcc = await acc
      if (!author?.date || !commitsAuthors.includes(author.name ?? '')) return prevAcc
      const date = new Date(author.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
      return [...prevAcc, date]
    }, Promise.resolve(accumulationInitializer))]
  }, Promise.resolve(accumulationInitializer))
}

const personalCommits = async (token: string) => {
  const repositories = await personalRepositories(token) ?? []
  return await repositoriesDates(repositories, token)
}

const organizationsCommits = async (token: string) => {
  const organizations = await fetchGithub<Organization[]>('users/lenixdev/orgs', token)
  return organizations?.reduce(async (acc, { login }) => {
    const prevAcc = await acc
    const organizationRepositories = await fetchGithub<Repository[]>(`orgs/${login}/repos`, token) ?? []
    const organizationRepositoriesDates = await repositoriesDates(organizationRepositories, token)
    return [...prevAcc, ...organizationRepositoriesDates]
  }, Promise.resolve(accumulationInitializer))
}

const languagesBytes = async (repositories: Repository[], login: string, token: string) =>
  repositories.reduce((acc, { fork, name }) =>
    fork ? acc : acc.then(async prevAcc => {
      const langs = await fetchGithub<Language>(`repos/${login}/${name}/languages`, token)
      if (!langs) return prevAcc
      return [...prevAcc, ...Object.entries(langs)
        .filter(([name]) => !excludedLangs.includes(name))
        .map(([name, bytes]) => ({ name, bytes }))]
    }), Promise.resolve([] as Languages))

const personalRepositoriesLanguagesBytes = async (token: string) => {
  const repositories = await personalRepositories(token)
  if (!repositories) return []
  return languagesBytes(repositories, 'lenixdev', token)
}

const organizationsRepositoriesLanguagesBytes = async (token: string) => {
  const organizations = await fetchGithub<Organization[]>('users/lenixdev/orgs', token)
  return organizations?.reduce(async (acc, { login }) => {
    const prevAcc = await acc
    const organizationRepositories = await fetchGithub<Repository[]>(`orgs/${login}/repos`, token)
    const languages = await languagesBytes(organizationRepositories || [], login, token)
    return [...prevAcc, ...languages]
  }, Promise.resolve([] as Languages))
}

const insights = async () => {
  const { GITHUB_TOKEN } = process.env
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable is not set')
  const validPersonalCommits = await personalCommits(GITHUB_TOKEN)
  const validOrganizationCommits = await organizationsCommits(GITHUB_TOKEN)
  const commits = validPersonalCommits && validOrganizationCommits ? [...validPersonalCommits, ...validOrganizationCommits] : []
  // const loc = await totalLinesOfCodes(GITHUB_TOKEN)
  const validPersonalLangsBytes = await personalRepositoriesLanguagesBytes(GITHUB_TOKEN)
  const validOrganizationLangsBytes = await organizationsRepositoriesLanguagesBytes(GITHUB_TOKEN)
  const langsBytes = (() => {
    const combined = [...(validPersonalLangsBytes ?? []), ...(validOrganizationLangsBytes ?? [])]
    const merged = new Map<string, number>()
    for (const { name, bytes } of combined) merged.set(name, (merged.get(name) ?? 0) + bytes)
    return Array.from(merged, ([name, bytes]) => ({ name, bytes })).sort((a, b) => b.bytes - a.bytes)
  })()
  return { /* loc,  */commits, langsBytes }
}

export type Insights = Awaited<ReturnType<typeof insights>>

export const cachedInsights = unstable_cache(insights, ['insights'], { revalidate: CACHE_REVALIDATION })