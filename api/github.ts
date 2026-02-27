export const fetchGithub = async <T,>(path: string, token: string) => {
  try {
    const resp = await fetch(`https://api.github.com/${path}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    if (!resp.ok) {
      console.error(`Error ${resp.status}`, await resp.text(), `resets in ${new Date(Number(resp.headers.get('x-ratelimit-reset')) * 1000)}`)
      return
    }
    return await resp.json() as T
  } catch (error) {
    console.error('Network error:', error)
  }
}