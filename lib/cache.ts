import "server-only"
import { Lang, langsAllowed } from "./dictionaries"
import { insights } from "./insights"
import { reviews } from "./reviews"

const reviewsPromises = {} as Record<Lang, ReturnType<typeof reviews>>
let insightsPromise: ReturnType<typeof insights> | undefined

export const coldStart = () => {
  console.debug("started")
  for (const lang of langsAllowed) reviewsPromises[lang] = reviews(lang)
  insightsPromise = insights()
}

export const cache = {
  reviews: (lang: Lang) => {
    if (!reviewsPromises[lang]) reviewsPromises[lang] = reviews(lang)
    return reviewsPromises[lang]
  },
  insights: () => {
    if (!insightsPromise) insightsPromise = insights()
    return insightsPromise
  },
}