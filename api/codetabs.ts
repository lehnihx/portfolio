import { safeRequest } from "lenix"
import "server-only"

export const fetchCodeTabs = async <T>(owner: string, repositoryName: string) => {
  const response = await safeRequest('api.codetabs.com', `v1/loc?github=${owner}/${repositoryName}`, {})
  if (!response.ok) console.log(response.statusText)
  return await response.json() as T
}