import { unstable_cache } from 'next/cache'
import { ValueOf } from 'next/dist/shared/lib/constants'

const defaultDictionary = await import('@/lib/dictionaries.json').then((module) => module.default)

export type Locale = typeof localesAllowed[number]
export type Locales = typeof defaultDictionary

export const localesAllowed = ['en', 'fr', 'de', 'ar'] as const
export const hasLocale = (locale: string): locale is Locale => localesAllowed.includes(locale as Locale)

export const getMyMemoryTranslation = async (value: string, localeFrom: Locale, localeTo: Locale) => {
  const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(value)}&langpair=${localeFrom}|${localeTo}`)
  if (!res.ok) throw new Error(`Failed to fetch translation for '${value}'`)
  const { responseData: {
    translatedText
  } }: { responseData: {
    translatedText: string
  } } = await res.json()
  return translatedText
}

export const getDictionary = async (locale: Locale): Promise<Locales> => {
  if (locale === 'en') return defaultDictionary

  try {
    return await unstable_cache(
      async (locale: Locale) => {
        const translatedPromises = (Object.entries(defaultDictionary) as [keyof Locales, ValueOf<Locales>][]).map(async ([key, value]) => {
          const translatedText = await getMyMemoryTranslation(value, "en", locale)
          if (locale === 'ar' && translatedText === value) console.warn(`MyMemory failed to translate (${key}) '${value}'`)
          return [key, translatedText]
        })
        const translatedEntries = await Promise.all(translatedPromises)
        return Object.fromEntries(translatedEntries) as Locales
      },
      ['translations', locale],
      { revalidate: false }
    )(locale)
  } catch (error) {
    console.error(`Something went wrong with MyMemory for ${locale} locale, and falling back to en dictionary as a result. Error details:`, error)
    return defaultDictionary
  }
}