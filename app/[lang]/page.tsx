import Home from "@/app/(page)"
import { getDictionary, getMyMemoryTranslation, hasLocale } from "../dictionaries"
import { notFound } from "next/navigation"
import { DictProvider } from "@/lib/dict"
import { unstable_cache } from 'next/cache'
import { APIBaseMessage } from "discord-api-types/v10"
import { DialogProvider } from "@/components/dialog"

export interface Review {
  name: string
  username: string
  body: string
  avatar: string
  reviewLink: string
  banner: string | undefined
  color: string | null
  locale: string | undefined
  verified: boolean | undefined
  avatar_decoration: string | undefined
  tag: string | null | undefined
  badge: string | undefined
  date: string
}

const Page = async ({ params }: PageProps<'/[lang]'>) => {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const hour = 60 * 60
  const { DISCORD_GUILD_ID } = process.env
  const reviews = (await unstable_cache(
    async () => {
      const response = await fetch(`https://discord.com/api/v10/channels/1246910653940367500/messages`, { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` }})
      const messages: APIBaseMessage[] = await response.json()
      return await Promise.all(messages.map(async ({ channel_id, id, content, author, timestamp, reactions }) => {
        const message = (content.split(/Feedback\s*:/)[1] ?? '').replace(/<@\d+>|\*\*|\n/g, '').trim()
        const date = new Date(timestamp)
        const { year, month } = { year: date.getFullYear(), month: date.getMonth() + 1 }
        return {
          content: await getMyMemoryTranslation(message, "ar", lang),
          id,
          channel_id,
          date: `${year}-${month}`,
          author,
          reactions
        }
      }))
    },
    ['discord-user'],
    { revalidate: 24 * hour }
  )()).map(({ id, content, channel_id, date, author: {
    username,
    id: userId,
    avatar,
    global_name,
    banner,
    accent_color,
    locale,
    verified,
    avatar_decoration_data,
    primary_guild
  }}): Review => ({
    name: global_name || username,
    username,
    body: content,
    locale,
    verified,
    date,
    avatar: avatar ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png` : "https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d80db9971f10a9757c99_Symbol.svg",
    reviewLink: `https://discord.com/channels/${DISCORD_GUILD_ID}/${channel_id}/${id}`,
    banner: banner ? `https://cdn.discordapp.com/banners/${userId}/${banner}.png` : undefined,
    color: accent_color ? `#${accent_color.toString(16).padStart(6, '0')}` : null, // from https://github.com/TripplerScripts/tr_pvpmodes/blob/main/server/services/competitive/chat.ts#L16
    avatar_decoration: avatar_decoration_data?.asset ? `https://cdn.discordapp.com/avatar-decoration-presets/${avatar_decoration_data.asset}.png` : undefined,
    tag: primary_guild?.tag,
    badge: primary_guild?.identity_enabled ? `https://cdn.discordapp.com/guild-tag-badges/${primary_guild?.identity_guild_id}/${primary_guild?.badge}` : undefined
  }))

  return (
    <DictProvider dict={dict}>
      <DialogProvider>
        <Home {...{ reviews }} />
      </DialogProvider>
    </DictProvider>
  )
}

export default Page