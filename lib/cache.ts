import "server-only"
import { Lang, langsAllowed } from "./dictionaries"
import { insights } from "./insights"
import { reviews } from "./reviews"

const reviewsPromises: Record<Lang, Promise<
  Awaited<
    ReturnType<typeof reviews>
  >
>> = {}
let insightsPromise: Promise<
  Awaited<
    ReturnType<typeof insights>
  >
>

export const coldStart = () => {
  for (const lang of langsAllowed) reviewsPromises[lang] = reviews(lang)
  insightsPromise = insights()
}

export const cache = {
  reviews: (lang: Lang) => reviewsPromises[lang],
  insights: () => {
    console.log(insightsPromise)
    return insightsPromise
  },
}