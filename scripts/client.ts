import { Octokit } from "@octokit/rest"

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
export const { data: personalRepositories } = await octokit.rest.repos.listForAuthenticatedUser({ username: "lenixdev", per_page: 100, type: 'all' })
export type AnyRepo = typeof personalRepositories[number] | Awaited<ReturnType<typeof octokit.rest.repos.listForOrg>>['data'][number]