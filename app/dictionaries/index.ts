import 'server-only'
import { unstable_cache } from 'next/cache'

const defaultDictionary = () => import('./en.json').then((module) => module.default)

export type Locale = typeof localesAllowed[number]
export type Locales = Awaited<ReturnType<typeof defaultDictionary>>

export const localesAllowed = ['en', 'fr', 'de', 'ar'] as const
export const hasLocale = (locale: string): locale is Locale => localesAllowed.includes(locale as Locale)

export const getDictionary = async (locale: Locale) => {
  const dicts = await defaultDictionary()
  if (locale === 'en') return dicts

  try {
    return await unstable_cache(
      async (locale: Locale) => {
        const pairs = Object.entries(dicts) as [keyof Locales, string][]
        const translatedPromises = pairs.map(async ([key, value]) => {
          const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(value)}&langpair=en|${locale}`)
          if (!response.ok) throw new Error(`Failed to fetch translation for '${value}'`)
          const { responseData: { translatedText } }: { responseData: { translatedText: string } } = await response.json()
          if (locale === 'ar' && translatedText === value) console.warn(`MyMemory failed to translate (${key}) '${value}'`)
          return [key, translatedText] as const
        })
        const translatedPairs = await Promise.all(translatedPromises)
        const translatedDict = Object.fromEntries(translatedPairs) as Record<keyof Locales, string>
        return translatedDict
      },
      ['translations', locale],
      { revalidate: false }
    )(locale)
  } catch (error) {
    console.error(`Something went wrong with MeMemory for ${locale} locale, and falling back to en dictionary as a result. Error details:`, error)
    return dicts
  }
}