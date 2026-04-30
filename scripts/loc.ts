import { raise } from 'lenix'
import { octokit, ownerRepos, VALID_NAMES } from './client'

const getStats = async (owner: string, repo: string) => {
	try {
		const { data, status } = await octokit.rest.repos.getContributorsStats({ owner, repo })
		if (status === 202) {
			console.warn(`github currently has an unfixed error, tried on: ${owner}/${repo}, skipping`)
			return null
		}
		return Array.isArray(data) ? data : []
	} catch(err) {
		raise(err)
	}
}

export const totalLinesAdded = async () => {
	const total = { added: 0, deleted: 0 }
	const targets = ownerRepos.filter(({ owner }) => VALID_NAMES.includes(owner.login))

	const results = await Promise.all(targets.map(async ({ owner, name }) => getStats(owner.login, name)))

	for (const [, stats] of results.entries())
	if (stats)
	for (const contributor of stats)
	if (contributor.author?.login === 'LenixDev')
	for (const week of contributor.weeks) {
		total.added += week.a ?? 0
		total.deleted += week.d ?? 0
	}
	return total
}