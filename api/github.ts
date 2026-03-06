import { safeRequest } from "lenix"
import "server-only"

export const fetchGithub = async <T,>(path: string, token: string) => {
  const response = await safeRequest('api.github.com', `${path}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  if (!response.ok) {
    console.error(`Error ${response.status}`, await response.text(), `\n-resets in ${new Date(Number(response.headers.get('x-ratelimit-reset')) * 1000)}`)
    return
  }
  return await response.json() as T
}