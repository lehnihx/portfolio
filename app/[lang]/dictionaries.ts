import 'server-only'
 
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
}
 
type Locale = keyof typeof dictionaries
 
export const hasLocale = (locale: string): locale is Locale => locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export type Locales = Awaited<ReturnType<typeof dictionaries["en"]>>