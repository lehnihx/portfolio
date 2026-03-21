import "server-only"
import { Review } from "@/app/[lang]/page"
import { APIBaseMessage } from "discord-api-types/v10"
import { unstable_cache } from "next/cache"
import { CACHE_REVALIDATION } from "./utils"
import { fetchMyMemory } from "@/api/mymemory"
import { Lang } from "./dictionaries"
import { fetchDiscord } from "@/api/discord"

const { DISCORD_GUILD_ID, DISCORD_BOT_TOKEN } = (() => {
  const { DISCORD_GUILD_ID, DISCORD_BOT_TOKEN } = process.env
  if (!DISCORD_BOT_TOKEN) throw new Error('DISCORD_BOT_TOKEN environment variable is not defined')
  if (!DISCORD_GUILD_ID) throw new Error('DISCORD_GUILD_ID environment variable is not defined')
  return { DISCORD_GUILD_ID, DISCORD_BOT_TOKEN }
})()

export const fetchReviews = async (lang: Lang) => {
  const filterMessage = (characters: string) => (characters.split(/Feedback\s*:/)[1] ?? '').replace(/<@\d+>|\*\*|\n/g, '').trim()

  const messages = await fetchDiscord<APIBaseMessage[]>('channels/1246910653940367500/messages', DISCORD_BOT_TOKEN)
  if (!messages) return []

  const mappedMessages = messages.map(async ({ channel_id, id, content, author, timestamp, reactions }) => {
    const message = filterMessage(content)
    const date = new Date(timestamp)
    const { year, month } = { year: date.getFullYear(), month: date.getMonth() + 1 }
    return {
      body: message,
      translation: await fetchMyMemory(message, "ar", lang) ?? message,
      id,
      channel_id,
      date: `${year}-${month}`,
      author,
      reactions
    }
  })
  return await Promise.all(mappedMessages)
}

const cachedFetchData = (lang: Lang) => unstable_cache(() => fetchReviews(lang), ['discord-reviews', lang], { revalidate: CACHE_REVALIDATION })()

const reviews = async (lang: Lang) => {
  const hitedCache = await cachedFetchData(lang)
  const reviews = hitedCache.map(({ id, body, translation, channel_id, date, author: {
    username, id: userId, avatar, global_name, banner, accent_color, locale, verified, avatar_decoration_data, primary_guild
  }}): Review => ({
    name: global_name || username,
    username,
    body,
    translation,
    locale,
    verified,
    date,
    avatar: avatar ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png` : "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d80db9971f10a9757c99_Symbol.svg",
    reviewLink: `https://discord.com/channels/${DISCORD_GUILD_ID}/${channel_id}/${id}`,
    banner: banner ? `https://cdn.discordapp.com/banners/${userId}/${banner}.png` : undefined,
    color: accent_color ? `#${accent_color.toString(16).padStart(6, '0')}` : null,
    avatar_decoration: avatar_decoration_data?.asset ? `https://cdn.discordapp.com/avatar-decoration-presets/${avatar_decoration_data.asset}.png` : undefined,
    tag: primary_guild?.tag,
    badge: primary_guild?.identity_enabled ? `https://cdn.discordapp.com/guild-tag-badges/${primary_guild?.identity_guild_id}/${primary_guild?.badge}` : undefined
  }))
  return reviews
}

export default reviews