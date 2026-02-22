import Home from "@/app/(page)"
import { getDictionary, getReviewsDictionary, hasLocale } from "../dictionaries"
import { notFound } from "next/navigation"
import { DictProvider } from "@/lib/dict"
import { unstable_cache } from 'next/cache'
import { Review, ReviewUserId } from "@/lib/types"
import { APIUser } from "discord-api-types/v10"
import { DialogProvider } from "@/lib/dialog"

const Page = async ({ params }: PageProps<'/[lang]'>) => {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const reviewsDict = await getReviewsDictionary(lang)
  const usersId = Object.keys(reviewsDict) as ReviewUserId[]
  const hour = 60 * 60

  const getDiscordUser = async (id: ReviewUserId): Promise<APIUser | null> => {
    try {
      const response = await fetch(`https://discord.com/api/v10/users/${id}`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` }
      })
      if (!response.ok) {
        console.warn(`Discord API error ${response.status} for user ${id}`)
        return null
      }
      return response.json()
    } catch (error) {
      console.warn(`Discord API request failed for user ${id}`, error)
      return null
    }
  }

  const getDiscordUsers = unstable_cache(
    async (ids: ReviewUserId[]) => {
      const promisesUsers = ids.map(async (id) => {
        return await getDiscordUser(id)
      })
      const users = await Promise.all(promisesUsers)
      return users
    },
    ['discord-user'],
    { revalidate: 24 * hour }
  )

  const users = await getDiscordUsers(usersId)
  const reviews: Review[] = users.flatMap((user) => {
    if (!user) return
    const {
      username,
      id,
      avatar,
      global_name,
      banner,
      accent_color,
      locale,
      verified,
      avatar_decoration_data,
      primary_guild
    } = user
    const userReviews = reviewsDict[id as keyof typeof reviewsDict].messages
    const userMessageId = reviewsDict[id as keyof typeof reviewsDict].messageId
    const reviewsArray = Array.isArray(userReviews) ? userReviews : [userReviews]
    const { DISCORD_GUILD_ID, DISCORD_CHANNEL_ID } = process.env
    return reviewsArray.map(review => ({
      name: global_name || username,
      username,
      body: review,
      avatar: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d80db9971f10a9757c99_Symbol.svg",
      reviewLink: `https://discord.com/channels/${DISCORD_GUILD_ID}/${DISCORD_CHANNEL_ID}/${userMessageId}`,
      banner: banner ? `https://cdn.discordapp.com/banners/${id}/${banner}.png` : undefined,
      color: accent_color ? `#${accent_color.toString(16).padStart(6, '0')}` : null, // from https://github.com/TripplerScripts/tr_pvpmodes/blob/main/server/services/competitive/chat.ts#L16
      locale,
      verified,
      avatar_decoration: avatar_decoration_data?.asset ? `https://cdn.discordapp.com/avatar-decoration-presets/${avatar_decoration_data.asset}.png` : undefined,
      tag: primary_guild?.tag,
      badge: primary_guild?.identity_enabled ? `https://cdn.discordapp.com/guild-tag-badges/${primary_guild?.identity_guild_id}/${primary_guild?.badge}` : undefined
    }))
  })
  return (
    <DictProvider dict={dict}>
      <DialogProvider>
        <Home {...{ reviews }} />
      </DialogProvider>
    </DictProvider>
  )
}

export default Page
