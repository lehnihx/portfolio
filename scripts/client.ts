import { Octokit } from "@octokit/rest"

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
export const { data: ownerRepos } = await octokit.rest.repos.listForAuthenticatedUser({ per_page: 100, type: 'owner' })