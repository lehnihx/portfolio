import Home from "@/app/(page)"
import { getDictionary, getReviewsDictionary, hasLocale } from "../dictionaries"
import { notFound } from "next/navigation"
import { DictProvider } from "@/lib/dict"
import { unstable_cache } from 'next/cache'
import { Reviews, ReviewUserId } from "@/lib/types"
import { APIUser } from "discord-api-types/v10"

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
    async (ids: ReviewUserId[]) => await Promise.all(ids.map(async (id) => getDiscordUser(id))),
    ['discord-user'],
    { revalidate: 24 * hour }
  )

  const users = await getDiscordUsers(usersId)
  const reviews: Reviews[] = users.flatMap((user) => {
    if (!user) return []
    const { global_name, username, id, avatar } = user
    const avatar_url = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
    const userReviews = reviewsDict[id as keyof typeof reviewsDict].messages
    const userMessageId = reviewsDict[id as keyof typeof reviewsDict].messageId
    const reviewsArray = Array.isArray(userReviews) ? userReviews : [userReviews]
    const { DISCORD_GUILD_ID, DISCORD_CHANNEL_ID } = process.env
    return reviewsArray.map(review => ({
      name: global_name || username,
      username,
      body: review,
      img: avatar_url,
      url: `https://discord.com/channels/${DISCORD_GUILD_ID}/${DISCORD_CHANNEL_ID}/${userMessageId}`
    }))
  })
  return (
    <DictProvider dict={dict}>
      <Home {...{ reviews }} />
    </DictProvider>
  )
}

export default Page
