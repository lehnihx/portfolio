import { CACHE_REVALIDATION } from "@/lib/utils"
import { safeRequest } from "lenix"
import "server-only"

export const fetchDiscord = async <T>(path: string, token: string) => {
  const response = await safeRequest('discord.com', `api/v10/${path}`, {
    headers: {
      Authorization: `Bot ${token}`
    },
    next: { revalidate: CACHE_REVALIDATION },
  })
  return await response.json() as T
}