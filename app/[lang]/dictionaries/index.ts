import 'server-only'
import { unstable_cache } from 'next/cache'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  fr: null,
  de: null,
  ar: null
}
 
type Locale = keyof typeof dictionaries
 
const translateDict = unstable_cache(
  async (locale: Locale) => {
    const dicts = await dictionaries['en']()
    return Object.fromEntries(await Promise.all(
      Object.entries(dicts).map(async ([key, value]) => {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(value)}&langpair=en|${locale}`)
        const { responseData: { translatedText } } = await res.json()
        if (locale === 'ar' && translatedText === value) console.warn(`MeMemory failed to translate (${key}) '${value}'`)
        return [key, translatedText]
      })
    ))
  },
  ['translations'],
  { revalidate: false }
)

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries

export const getDictionary = async (locale: Locale) => {
  if (locale === 'en') return dictionaries['en']()
  return translateDict(locale)
}
export type Locales = Awaited<ReturnType<typeof dictionaries["en"]>>