import { Lang } from "@/lib/dictionaries"

export const fetchMyMemory = async (value: string, localeFrom: Lang, localeTo: Lang) => {
  const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(value)}&langpair=${localeFrom}|${localeTo}`)
  if (!res.ok) throw new Error(`${res.status}: Failed to fetch translation for '${value}'`)
  const { responseData: {
    translatedText
  } }: { responseData: {
    translatedText: string
  } } = await res.json()
  return translatedText
}