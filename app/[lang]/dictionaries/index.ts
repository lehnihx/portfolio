import 'server-only'
import { unstable_cache } from 'next/cache'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  fr: null,
  de: null,
  ar: null
}

type Locale = keyof typeof dictionaries
export type Locales = Awaited<ReturnType<typeof dictionaries["en"]>>

const translateDict = unstable_cache(
  async (locale: Locale) => {
    const dicts = await dictionaries['en']()

    const pairs = Object.entries(dicts) as [keyof Locales, string][]
    const translatedPromises = pairs.map(async ([key, value]) => {
      const { ok, json } = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(value)}&langpair=en|${locale}`)
      if (!ok) throw new Error(`Failed to fetch translation for '${value}'`)
      const { responseData: { translatedText } }: { responseData: { translatedText: string } } = await json()
      if (locale === 'ar' && translatedText === value) console.warn(`MeMemory failed to translate (${key}) '${value}'`)
      return [key, translatedText] as const
    })
    const translatedPairs = await Promise.all(translatedPromises)
    const translatedDict = Object.fromEntries(translatedPairs) as Record<keyof Locales, string>
    return translatedDict
  },
  ['translations'],
  { revalidate: false }
)

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries

export const getDictionary = async (locale: Locale) => {
  if (locale === 'en') return await dictionaries['en']()
  try {
    return await translateDict(locale)
  } catch (error) {
    console.error(`Something went wrong with MeMemory for ${locale} locale, and falling back to en dictionary as a result. Error details:`, error)
    return await dictionaries['en']()
  }
}