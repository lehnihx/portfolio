import { safeRequest } from "lenix"
import "server-only"

export const fetchDiscord = async <T>(path: string, token: string) => {
  const response = await safeRequest('discord.com', `api/v10/${path}`, {
    headers: {
      Authorization: `Bot ${token}`
    }
  })
  return await response.json() as T
}