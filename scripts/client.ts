import { Octokit } from "@octokit/rest"

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
export const { data: personalRepositories } = await octokit.rest.repos.listForUser({ username: "lenixdev", per_page: 100 })