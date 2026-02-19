import 'server-only'

const locales = ['en', 'ar', 'fr', 'de'] as const
export type Locale = typeof locales[number]

const dictionaries = Object.fromEntries(
  locales.map(locale => [locale, () => import(`./dictionaries/${locale}.json`).then(module => module.default)])
) as Record<Locale, () => Promise<unknown>>

export const hasLocale = (locale: string): locale is Locale => locales.includes(locale as Locale)
export const getDictionary = async (locale: Locale) => dictionaries[locale]()