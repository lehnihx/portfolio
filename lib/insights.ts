import 'server-only'
import { Repository, RepositoryLanguageStats, Organization } from '@/lib/types'
import { wait } from 'lenix'
import { unstable_cache } from 'next/cache'
import { CACHE_REVALIDATION } from './utils'
import { fetchGithub } from '@/api/github'

const repositoriesLanguages = <T,>(owner: string, repositories: Repository[] | undefined) => {
  let remainingCount = repositories?.length ?? 0
  return repositories?.reduce(async (acc, repository) => {
    const previouRepository = await acc
    console.log(`${repository.name} was fetched from ${owner}, ${--remainingCount} more remaining`)
    await wait(5000)
    const response = await fetch(`https://api.codetabs.com/v1/loc?github=${owner}/${repository.name}`)
    if (!response.ok) console.log(response.statusText)
    const data = await response.json() as T
    return [...previouRepository, { [repository.name]: data} ]
  }, Promise.resolve([] as { [key: NonNullable<typeof repositories>[number]["name"]]: T }[]))
}

const personalLinesLinesOfCodes = async (token: string) => {
  const repositories = await fetchGithub<Repository[]>('users/lenixdev/repos', token)
  const personalRepositoriesLanguages = await (async <T,>() => repositoriesLanguages<T>('lenixdev', repositories))<Array<RepositoryLanguageStats>>()

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
    const organizationsRepositoriesLanguages = await (async <T,>() => repositoriesLanguages<T>(organizationName, organizationRepositories))<Array<RepositoryLanguageStats>>()

    return [...previousOrganization, organizationsRepositoriesLanguages?.reduce((acc, repo) => {
      const languages = Object.values(repo)[0]
      return acc + languages.reduce((acc, language) => acc + language.lines, 0)
    }, 0)]
  }, Promise.resolve([] as (number | undefined)[]))
  return (linesOfCodes)?.reduce((acc, n) => (acc ?? 0) + (n ?? 0), 0)
}

const insights = async () => {
  const { GITHUB_TOKEN } = process.env
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN environment variable is not set')
  return [await personalLinesLinesOfCodes(GITHUB_TOKEN), await organizationLinesOfCodes(GITHUB_TOKEN)].reduce((acc, n) => (acc ?? 0) + (n ?? 0), 0)
}

export const cachedInsights = unstable_cache(insights, ['insights-loc'], { revalidate: CACHE_REVALIDATION})