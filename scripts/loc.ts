import { wait } from 'lenix'
import { octokit, ownerRepos, VALID_NAMES } from './client'

const waitInterval = 10000

const getStats = async (owner: string, repo: string, retry = 0) => {
	const { data, status } = await octokit.rest.repos.getContributorsStats({
		owner,
		repo,
	})
	if (status === 202) {
		console.warn(`retrying ${owner}/${repo}... (${retry + 1})`)
		await wait(waitInterval)
		return getStats(owner, repo, retry + 1)
	}
	return Array.isArray(data) ? data : []
}

export const totalLinesAdded = async () => {
	const total: { added: number; deleted: number } = { added: 0, deleted: 0 }
	for (const { name, owner } of ownerRepos)
		if (VALID_NAMES.includes(owner.login)) {
			const stats = await getStats(owner.login, name)
			for (const contributor of stats)
				if (contributor.author?.login === 'LenixDev')
					// eslint-disable-next-line max-depth
					for (const week of contributor.weeks) {
						total.added += week.a ?? 0
						total.deleted += week.d ?? 0
					}
		}
	return total
}
