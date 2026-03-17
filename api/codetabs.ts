import "server-only"
import { safeRequest } from "lenix"
import { CACHE_REVALIDATION } from "@/lib/utils"

export const fetchCodeTabs = async <T>(owner: string, repositoryName: string) => {
  const response = await safeRequest('api.codetabs.com', `v1/loc?github=${owner}/${repositoryName}`, {
    next: { revalidate: CACHE_REVALIDATION }
  })
  if (!response.ok) console.log(response.statusText)
  return await response.json() as T
}