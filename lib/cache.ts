import "server-only"
import { Lang, langsAllowed } from "./dictionaries"
import { insights } from "./insights"
import { reviews } from "./reviews"

const awaitedReviews: Partial<Record<Lang, Awaited<ReturnType<typeof reviews>>>> = {}
let awaitedInsights: Awaited<ReturnType<typeof insights>> | undefined

export const coldStart = async () => {
  for (const lang of langsAllowed) awaitedReviews[lang] = await reviews(lang)
  awaitedInsights = await insights()
}

export const cache = {
  reviews: (lang: Lang) => awaitedReviews[lang],
  insights: () => awaitedInsights
}