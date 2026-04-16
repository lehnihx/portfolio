import { raise, wait } from 'lenix'
import { octokit, ownerRepos, VALID_NAMES } from './client'

const getStats = async (owner: string, repo: string) => {
	try {
		const { data, status } = await octokit.rest.repos.getContributorsStats({ owner, repo })
		if (status === 202) return null
		return Array.isArray(data) ? data : []
	} catch {
		raise(`failed ${owner}/${repo}, skipping`)
		return []
	}
}

export const totalLinesAdded = async () => {
	const total = { added: 0, deleted: 0 }
	const targets = ownerRepos.filter(({ owner }) => VALID_NAMES.includes(owner.login))

	let results = await Promise.all(targets.map(({ owner, name }) => getStats(owner.login, name)))

	if (results.some(r => r === null)) {
		await wait(30000)
		results = await Promise.all(targets.map(({ owner, name }) => getStats(owner.login, name)))
	}

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