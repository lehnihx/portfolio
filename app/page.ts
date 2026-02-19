import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { hasLocale } from './[lang]/dictionaries'

const Root = async () => {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') ?? 'en'
  const lang = acceptLanguage.split(',')[0].split('-')[0]
  redirect(`/${hasLocale(lang) ? lang : 'en'}`)
}

export default Root