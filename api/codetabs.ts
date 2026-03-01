import "server-only"
export const fetchCodeTabs = async <T>(owner: string, repositoryName: string) => {
  try {
    const response = await fetch(`https://api.codetabs.com/v1/loc?github=${owner}/${repositoryName}`)
    if (!response.ok) console.log(response.statusText)
    return await response.json() as T
  } catch (error) {
    console.error(error)
  }
}