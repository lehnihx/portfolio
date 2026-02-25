import { unstable_cache } from 'next/cache'
import { ValueOf } from 'next/dist/shared/lib/constants'
import { CACHE_REVALIDATION } from './utils'

const defaultDictionary = await import('@/lib/dictionaries.json').then((module) => module.default)

export type Lang = typeof langsAllowed[number]
export type Dict = typeof defaultDictionary

export const langsAllowed = ['en', 'fr', 'de', 'ar'] as const
export const hasLang = (lang: string): lang is Lang => langsAllowed.includes(lang as Lang)

export const getMyMemoryTranslation = async (value: string, localeFrom: Lang, localeTo: Lang) => {
  const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(value)}&langpair=${localeFrom}|${localeTo}`)
  if (!res.ok) throw new Error(`${res.status}: Failed to fetch translation for '${value}'`)
  const { responseData: {
    translatedText
  } }: { responseData: {
    translatedText: string
  } } = await res.json()
  return translatedText
}

export const Dictionary = async (lang: Lang): Promise<Dict> => {
  if (lang === 'en') return defaultDictionary

  try {
    return await unstable_cache(
      async (lang: Lang) => {
        const translateUtterance = async (utterance: string) => {
          const translatedUtterance = await getMyMemoryTranslation(utterance, "en", lang)
          if (lang === 'ar' && translatedUtterance === utterance) console.warn(`MyMemory failed to translate '${utterance}'`)
          console.log(translatedUtterance)
          return translatedUtterance
        }

        const translatedUtterances = async (key: keyof Dict, utterances: ValueOf<Dict>) => {
          const translated = Array.isArray(utterances)
            ? await Promise.all(utterances.map(translateUtterance))
            : await translateUtterance(utterances)
          return [key, translated]
        }
        const dictionary = Object.entries(defaultDictionary) as [keyof Dict, ValueOf<Dict>][]
        const translationPromises = dictionary.map(async ([key, utterances]) => translatedUtterances(key, utterances))
        const translationEntries = await Promise.all(translationPromises)
        return Object.fromEntries(translationEntries) as Dict
      },
      ['translations', lang],
      { revalidate: CACHE_REVALIDATION }
    )(lang)
  } catch (error) {
    console.error(`Something went wrong with MyMemory for ${lang} lang, and falling back to the 'en' dictionary as a result. Error details:`, error)
    return defaultDictionary
  }
}