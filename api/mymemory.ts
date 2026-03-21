import { Lang } from "@/lib/dictionaries"
import { CACHE_REVALIDATION } from "@/lib/utils"
import { safeRequest } from "lenix"

export const fetchMyMemory = async (value: string, localeFrom: Lang, localeTo: Lang) => {
  const result = await safeRequest('api.mymemory.translated.net', `get?q=${encodeURIComponent(value)}&langpair=${localeFrom}|${localeTo}`, {
    next: { revalidate: CACHE_REVALIDATION },
  })
  if (!result.ok) throw new Error(`${result.status}: Failed to fetch translation for '${value}'`)
  const { responseData: {
    translatedText
  } } = await result.json() as { responseData: { 
    translatedText: string
  } }
  return translatedText
}